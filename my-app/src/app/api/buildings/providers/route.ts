export const dynamic = 'force-dynamic' // defaults to auto

import { Building } from "../../../../types/types"
import { NextResponse, NextRequest } from "next/server";
import { pool } from "@/configDB/pg-config";
import { mappingBuildings } from "@/helpers/mapping";

export async function GET(request: NextRequest) {
  try {
    const filters: any = {}
    const params = request.nextUrl
    params?.search?.substring(1)?.split('&')?.forEach(e => { filters[e.split('=')[0]] = e.split('=')[1] })
    const role = request.headers.get('user_role')

    const id = request.headers.get('user_id')

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
          b.amount,
          COALESCE(json_agg(DISTINCT i.image_url) FILTER (WHERE i.id IS NOT NULL), '[]') AS images,
          COALESCE(json_agg(DISTINCT f.facility_name) FILTER (WHERE f.id IS NOT NULL), '[]') AS facilities,
          COALESCE(json_agg(DISTINCT bk.status) FILTER (WHERE bk.id IS NOT NULL), '[]') AS bookings,
          COALESCE(json_agg(DISTINCT r.rules_name) FILTER (WHERE r.id IS NOT NULL), '[]') AS rules,
          COALESCE(json_agg(DISTINCT s.specification_name) FILTER (WHERE s.id IS NOT NULL), '[]') AS specifications
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
    `

    const values = [];
    const conditions = [];

    if (filters.category) {
      values.push(filters.category);
      conditions.push(`b.category = $${values.length}`);
    }

    // Tambahkan kondisi filter lainnya di sini sesuai kebutuhan
    if (role == 'provider') {
      query += ` WHERE b.provider_id = '${id}'`
    }

    if (conditions.length > 0) {
      if (role == 'provider') {
        query += ` AND ${conditions.join(' AND ')}`;
      } else {
        query += ` WHERE ${conditions.join(' AND ')}`;
      }
    }

    query += `
      GROUP BY 
        b.id
      ORDER BY 
        b.id desc;
    `;

    const { rows }: { rows: Building[] } = await pool.query(query, values)

    const buildings = rows

    return NextResponse.json(mappingBuildings(buildings))

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}

import { v2 as cloudinary } from 'cloudinary';
import { makeSlug } from "@/helpers/addSlug";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const providerId = request.headers.get('user_id')

    let formData = await request.formData() as FormData
    let key = ['building_name', 'price', 'category', 'thumbnail', 'address', 'coordinate', 'price', 'description', 'amount']
    let keyArr = ['specification', 'facility', 'rule', 'images']
    const mappingData = async () => {
      const data = {} as any;

      const promises = key.map(async (e: string) => {
        if (e === 'thumbnail') {
          const thumbnail = formData.getAll(e)[0] as any;
          const type = thumbnail.type;
          const buffer = Buffer.from(await thumbnail.arrayBuffer()).toString('base64');
          const dataURI = `data:${type};base64,${buffer}`;
          const res = await cloudinary.uploader.upload(dataURI);
          data[e] = res.secure_url;
        } else {
          data[e] = formData.getAll(e)[0];
        }
      });

      await Promise.all(promises);

      data.provider_id = providerId;
      data.slug = data?.building_name?.split(" ").join("_") + "_" + makeSlug(5)
      data.status = "Tersedia"
      return data;
    };
    let data = await mappingData() as any

    let query = `
    INSERT INTO "Buildings"(${Object.keys(data).map(e => `"${e}"`).join(', ')})
    VALUES(${Object.values(data).map(e => `'${e}'`).join(', ')})
    RETURNING id;
    `

    const insert = await pool.query(query)

    const insertAttribute = async () => {
      const data = {} as any;
      const promises = keyArr.map(async (e: string) => {
        if (e === 'facility' || e === 'rule' || e === 'specification') {

          let attributes = formData.getAll(e) as any

          const tableName = e.endsWith('y') ? `Building_${e.slice(0, -1)}ies` : `Building_${e}s`
          const values = attributes.map((attr: any) => `('${insert.rows[0].id}', '${attr}')`).join(", ");

          const query = `INSERT INTO "${tableName}" (building_id, ${e}_id)
          VALUES ${values};`

          await pool.query(query)
        }
        if (e === 'images') {
          const images = formData.getAll(e) as any
          const urls = await Promise.all(images.map(async (file: any) => {
            let type = file.type;
            let buffer = Buffer.from(await file.arrayBuffer()).toString('base64');
            const dataURI = `data:${type};base64,${buffer}`;

            return (await cloudinary.uploader.upload(dataURI)).secure_url;
          }));

          const values = urls.map((url: any) => `('${insert.rows[0].id}', '${url}')`).join(", ");
          const query = `INSERT INTO "Images" (building_id, image_url)
          VALUES ${values};`;

          await pool.query(query);
        }

      });
      await Promise.all(promises);
      return data;
    }
    await insertAttribute()

    if (insert.rowCount == 1) {
      return NextResponse.json({ message: 'success post building' }, { status: 201 })
    }
    return NextResponse.json({ message: "success" }, { status: 201 });


  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function DELETE(request: Request) {

  try {
    const userId = request.headers.get('user_id');
    const role = request.headers.get('user_role');

    if (!userId || role !== 'provider') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { slug } = await request.json();

    const query = `
      DELETE FROM "Buildings"
      WHERE slug = $1 AND provider_id = $2
      RETURNING building_name;
    `;
    const { rows } = await pool.query(query, [slug, userId]);

    if (rows.length === 0) {
      return NextResponse.json({ message: 'tidak ada kost/ kontrakan yang dihapus' }, { status: 404 });
    }

    const building_name = rows[0].building_name;

    return NextResponse.json({ message: `Kost/ kontrakan ${building_name} berhasil dihapus` });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}


