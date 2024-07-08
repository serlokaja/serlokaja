export const dynamic = 'force-dynamic' // defaults to auto

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
import { v2 as cloudinary } from 'cloudinary';
import { Building } from "@/types/types";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PATCH(request: Request, { params }: { params: { slug: string } }) {
  const client = await pool.connect();

  try {
    const providerId = request.headers.get('user_id')
    const { slug } = params

    const querySelect = `
        SELECT * FROM "Buildings"
        WHERE slug = '${slug}'`
    const { rows: [{ id }] } = await client.query(querySelect);

    let formData = await request.formData() as FormData
    let key = ['building_name', 'price', 'category', 'thumbnail', 'address', 'coordinate', 'price', 'description', 'amount']
    let keyArr = ['specification', 'facility', 'rule']
    const mappingData = async () => {
      const data = {} as any;

      const promises = key.map(async (e: string) => {
        if (e === 'thumbnail') {
          const thumbnail = formData.getAll(e)[0] as any;
          if (typeof thumbnail == "string") {
            data[e] = thumbnail;
          } else {
            const type = thumbnail.type;
            const buffer = Buffer.from(await thumbnail.arrayBuffer()).toString('base64');
            const dataURI = `data:${type};base64,${buffer}`;
            const res = await cloudinary.uploader.upload(dataURI);
            data[e] = res.secure_url;
          }
        } else {
          data[e] = formData.getAll(e)[0];
        }
      });

      await Promise.all(promises);

      return data;
    };
    let data = await mappingData() as any

    const cleanData = Object.entries(data)
      .filter(([key, value]) => value !== undefined)
      .reduce((obj: any, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    await client.query('BEGIN');

    let query = `
        UPDATE "Buildings"
        SET 
        ${Object.keys(cleanData).map(e => `${e} = '${cleanData[e]}'`).join(', ')}
        WHERE slug = '${slug}'
        `

    const update = await client.query(query)
    // if (update.rowCount == 0) {
    //   await client.query("ROLLBACK")
    // }
    const hapus = async () => {

      let a = keyArr.map(async (e) => {
        const tableName = e.endsWith('y') ? `Building_${e.slice(0, -1)}ies` : `Building_${e}s`

        let queryDelete = `
              DELETE FROM "${tableName}"
              WHERE building_id = '${id}';
              `

        let deleted = await client.query(queryDelete)
        // if (deleted.rowCount == 0) {
        //   await client.query("ROLLBACK")
        // }
      })
      await Promise.all(a)

    }
    await hapus()

    const insert = async () => {
      const a = keyArr.map(async (e) => {
        let attributes = formData.getAll(e) as any

        const tableName = e.endsWith('y') ? `Building_${e.slice(0, -1)}ies` : `Building_${e}s`
        const values = attributes.map((attr: any) => `('${id}', '${attr}')`).join(", ")
        console.log(tableName);
        console.log(attributes);
        console.log(values);
        if (attributes.length) {
          const query = `INSERT INTO "${tableName}" (building_id, ${e}_id)
                VALUES ${values};`

          let insert = await pool.query(query)
          console.log(query);
        }

        // if (insert.rowCount == 0) {
        //   await client.query("ROLLBACK")
        // }
      })
      await Promise.all(a)
    }
    await insert()


    await client.query('COMMIT');

    if (update.rowCount == 1) {
      return NextResponse.json({ message: 'success update building' }, { status: 201 })
    }
    return NextResponse.json({ message: "success" }, { status: 201 });

  } catch (error) {
    console.log(error);
    await client.query('ROLLBACK');
    return NextResponse.json({ error }, { status: 500 })
  } finally {
    client.release();
  }
}
