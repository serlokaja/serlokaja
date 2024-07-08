export const dynamic = 'force-dynamic' // defaults to auto
import { Booking } from "../../../../types/types"

import { NextResponse } from "next/server";
import { pool } from "@/configDB/pg-config";
import { mappingDetailBook } from "@/helpers/mapping";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    const role = request.headers.get('user_role')
    const id = request.headers.get('user_id')
    console.log(id);


    let queryGroupBy = ''
    let queryPhone = ''
    if (role == "user") {
      queryPhone = `u.telp AS provider_telp,`
      queryGroupBy = `  LEFT JOIN 
      "Providers" u ON b.provider_id = u.id
      WHERE bk.slug = '${slug}'
      GROUP BY b.id, u.id, bk.slug, bk.date`
    } else {
      queryPhone = `u.telp AS user_telp,
      u.email,`
      queryGroupBy = `  LEFT JOIN 
      "Users" u ON bk.user_id = u.id
      WHERE bk.slug = '${slug}'
      GROUP BY b.id, u.id, bk.slug, bk.date`
    }

    let query = `
    SELECT 
        b.id,
        b.building_name,
        b.thumbnail,
        b.address,
        b.coordinate,
        b.status,
        b.category,
        b.type,
        b.price,
        b.description,
        b.provider_id,
        b.slug,
        bk.slug as bk_slug,
        bk.date,
        b.amount,
        ${queryPhone}
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
        COALESCE(json_agg(DISTINCT bk.status) FILTER (WHERE bk.id IS NOT NULL), '[]') AS bookings,
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
  ) AS specifications
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
          "Rules" r ON r.id = br.building_id
      LEFT JOIN 
          "Building_specifications" bs ON b.id = bs.building_id
      LEFT JOIN 
          "Specifications" s ON s.id = bs.building_id
    ${queryGroupBy}
      ORDER BY 
          b.id;
  `

    const { rows }: { rows: Booking[] } = await pool.query(query)

    const Bookings: Booking[] = rows

    return NextResponse.json(mappingDetailBook(Bookings[0]))

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}

export async function PATCH(request: Request) {
  try {

    const providerId = request.headers.get('user_id')
    const { slug, status, catatan, rekening } = await request.json()
    const patch = await pool.query(`
      UPDATE "Bookings"
      SET "status" = '${status}',
      WHERE slug = '${slug}';
    `)

    const Bookings = patch

    return NextResponse.json(Bookings)

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}


