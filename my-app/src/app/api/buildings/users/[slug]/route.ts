export const dynamic = 'force-dynamic' // defaults to auto
import { Building } from "../../../../../types/types"

import { NextResponse } from "next/server";
import { pool } from "@/configDB/pg-config";
import { mappingDetail } from "@/helpers/mapping";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        let queryGroupBy = ``
        const { slug } = params
        let query = `SELECT 
          b.id,
          b.building_name,
          b.thumbnail,
          b.address,
          b.type,
          b.category,
          b.coordinate,
          b.status,
          b.price,
          b.description,
          b.provider_id,
          b.slug,
          b.amount,
          p.telp AS provider_telp,
          COALESCE(
      jsonb_agg(
        DISTINCT jsonb_build_object('id', i.id, 'image_url', i.image_url)
      ) FILTER (WHERE i.id IS NOT NULL), 
      '[]'::jsonb
    ) AS images,
          COALESCE(
      jsonb_agg(
        DISTINCT jsonb_build_object('id', f.id, 'facility_name', f.facility_name)
      ) FILTER (WHERE f.id IS NOT NULL), 
      '[]'::jsonb
    ) AS facilities,
          COALESCE(
      jsonb_agg(
        DISTINCT jsonb_build_object('id', r.id, 'rules_name', r.rules_name)
      ) FILTER (WHERE r.id IS NOT NULL), 
      '[]'::jsonb
    ) AS rules,
           COALESCE(
      jsonb_agg(
        DISTINCT jsonb_build_object('id', s.id, 'specification_name', s.specification_name)
      ) FILTER (WHERE s.id IS NOT NULL), 
      '[]'::jsonb
    ) AS specifications,
          COALESCE(json_agg(DISTINCT bk.status) FILTER (WHERE bk.id IS NOT NULL), '[]') AS bookings
      FROM 
          "Buildings" b
      LEFT JOIN 
          "Images" i ON b.id = i.building_id
      LEFT JOIN 
          "Building_facilities" bf ON b.id = bf.building_id
      LEFT JOIN 
          "Facilities" f ON bf.facility_id = f.id
      LEFT JOIN 
          "Bookings" bk ON b.id = bk.building_id
      LEFT JOIN 
          "Building_rules" br ON b.id = br.building_id
      LEFT JOIN 
          "Rules" r ON r.id = br.rule_id
      LEFT JOIN 
          "Building_specifications" bs ON b.id = bs.building_id
      LEFT JOIN 
          "Specifications" s ON s.id = bs.specification_id
      LEFT JOIN 
            "Providers" p ON b.provider_id = p.id
      WHERE b.slug = $1
      GROUP BY b.id, p.telp
    `

        const { rows }: { rows: Building[] } = await pool.query(query, [slug])

        const buildings: Building = rows[0]

        return NextResponse.json(mappingDetail(buildings))

    } catch (error) {
        console.log(error);
        return NextResponse.json(error)
    }
}


