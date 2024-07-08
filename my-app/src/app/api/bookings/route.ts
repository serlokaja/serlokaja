export const dynamic = 'force-dynamic' // defaults to auto
import { Booking } from "../../../types/types"
const nodemailer = require("nodemailer");

import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/configDB/pg-config";
import { mappingBookings, mappingDetailBook } from "@/helpers/mapping";
import { makeSlug } from "@/helpers/addSlug";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const role = request.headers.get('user_role')
    const id = request.headers.get('user_id')

    const status = request?.nextUrl?.search?.substring(1)?.split('=')[1]?.split('-').join(" ")

    // params.search.substring(1).split('&').forEach(e => { filters[e.split('=')[0]] = e.split('=')[1] })

    let queryGroupBy = ''
    let queryPhone = ''
    if (role == "user") {
      queryPhone = `u.telp AS provider_telp,`
      queryGroupBy = `  LEFT JOIN 
      "Providers" u ON b.provider_id = u.id
      WHERE bk.user_id = ${id}
      GROUP BY b.id, bk.slug, u.id, bk.status, bk.date`
    } else {
      queryPhone = `u.telp AS user_telp,
      u.email,`
      queryGroupBy = `  LEFT JOIN 
      "Users" u ON bk.user_id = u.id
      WHERE bk.provider_id = ${id} AND bk.status = '${status}'
      GROUP BY b.id, bk.slug, u.id, bk.status, bk.date`
    }

    let query = `
    SELECT 
        b.id,
        b.building_name,
        b.thumbnail,
        b.address,
        b.coordinate,
        b.status,
        bk.date,
        b.category,
        b.type,
        b.price,
        b.description,
        b.provider_id,
        bk.slug as bk_slug,
        bk.status as bk_status,
        b.amount,
        ${queryPhone}
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
    ${queryGroupBy}
      ORDER BY 
          b.id;
  `

    const { rows }: { rows: Booking[] } = await pool.query(query)

    const Bookings: Booking[] = rows

    return NextResponse.json(mappingBookings(Bookings))

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dzakii8@gmail.com",
    pass: "rytn fylw mddm auhb",
  },
});
export async function POST(request: Request) {
  const user_id = request.headers.get('user_id')
  const user_email = request.headers.get('user_email')
  const { building_id, duration, date } = await request.json()

  const query = `INSERT INTO "Bookings"(user_id, provider_id, building_id, duration, status, slug, date)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING slug  ;`

  const querySelect = `
  SELECT
  b.id,
  b.building_name,
  p.email,
  p.id as provider_id
  FROM "Buildings"b
  LEFT JOIN "Providers" p ON p.id = b.provider_id
  WHERE b.id = ${building_id}
  `
  const { rows } = await pool.query(querySelect)

  const provider_email = rows[0].email
  const building_name = rows[0].building_name
  const provider_id = rows[0].provider_id
  const insert = await pool.query(query, [user_id, provider_id, building_id, duration, 'Menunggu', 'book-' + makeSlug(5), date])

  const info = await transporter.sendMail({
    from: 'Serloc Aja', // sender address
    to: user_email, // list of receivers
    subject: "Pemberitahuan Booking", // Subject line
    text: "", // plain text body
    html: `<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #0056b3;">Pemberitahuan Booking</h2>
    <p>Terima kasih telah melakukan booking dengan kami.</p>
    <p>Booking ID: <strong>${insert.rows[0].slug}</strong></p>
    <p>Nama Kost/ Kontrakan: <strong>${building_name}</strong></p>
    <p>Kami akan segera mengkonfirmasi reservasi Anda. Mohon menunggu konfirmasi lebih lanjut dari kami.</p>
    <br>
    <p>Terima kasih telah menggunakan layanan kami.</p>
    <p><strong>Serlok Aja</strong></p>
    </body>`
  });

  const infoProvider = await transporter.sendMail({
    from: 'Serloc Aja', // sender address
    to: provider_email, // list of receivers
    subject: "Confirmation Booking", // Subject line
    text: "", // plain text body
    html: `<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #0056b3;">Konfirmasi Pesanan Kost</h2>
    <p>Ada pesanan kost yang perlu dikonfirmasi:</p>
    <p>Nama Kost/ Kontrakan: <strong>${building_name}</strong></p>
    <p>Silakan segera konfirmasi pesanan ini.</p>
    <br>
    <p>Terima kasih telah menggunakan layanan kami.</p>
    <p><strong>Serlok Aja</strong></p>
    </body>`
  });
  return NextResponse.json({ message: `Email terkait detail pesanan telah dikirimkan ke ${user_email}`, bookingId: insert.rows[0].slug }, { status: 201 })
}

export async function PATCH(request: Request) {
  const client = await pool.connect();

  try {
    const providerId = request.headers.get('user_id');
    const role = request.headers.get('user_role');

    if (role !== "provider") {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { slug, status, nama, rekening, catatan } = await request.json();
    const { rows: [{ building_id, status: statusBook, user_id }] } = await client.query('SELECT * FROM "Bookings" WHERE slug = $1', [slug]);
    const { rows: [{ email }] } = await client.query('SELECT * FROM "Users" WHERE id = $1', [user_id]);

    console.log(email);


    const queryAmount = `
      SELECT b.amount, b.building_name
      FROM "Buildings" b
      LEFT JOIN "Bookings" bk ON bk.building_id = b.id
      WHERE b.id = $1
    `;
    const { rows: [{ amount, building_name }] } = await client.query(queryAmount, [building_id]);

    if (statusBook === "Disetujui" && status === "Disetujui") {
      return NextResponse.json({ message: 'pesanan telah diterima' }, { status: 400 });
    }

    if (amount < 1 && status === "Disetujui") {
      return NextResponse.json({ message: 'tidak dapat menerima karena sudah penuh' }, { status: 400 });
    }

    await client.query('BEGIN');

    const queryBookingUpdate = `
      UPDATE "Bookings"
      SET status = $1
      WHERE slug = $2 AND provider_id = $3
    `;
    const resultBookingUpdate = await client.query(queryBookingUpdate, [status, slug, providerId]);
    if (resultBookingUpdate.rowCount === 0) {
      await client.query('ROLLBACK');
      return NextResponse.json({ message: 'No booking found to update' }, { status: 404 });
    }

    await client.query('COMMIT');

    if (status == "Disetujui") {
      const infoProvider = await transporter.sendMail({
        from: 'Serlok Aja', // sender address
        to: email, // list of receivers
        subject: "Pemberitahuan Booking", // Subject line
        text: "", // plain text body
        html: `<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0056b3;">Pesanan Ruko/Kontrakan Anda Telah Disetujui!</h2>
          <p>Nama Ruko/Kontrakan: <strong>${building_name}</strong></p>
          <p>Nomor Rekening: <strong>${rekening}</strong></p>
          <p>Atas Nama: <strong>${nama}</strong></p>
          <p>Catatan: ${catatan}</p>
          <p>Silakan lanjutkan pembayaran ke rekening di atas untuk menyelesaikan proses booking Anda.</p>
          <br>
          <p>Terima kasih telah menggunakan layanan kami.</p>
          <p><strong>Serlok Aja</strong></p>`
      });

    }
    let message = `Pesanan ${slug} `;
    switch (status) {
      case "Disetujui":
        message += 'disetujui';
        break;
      case "Tidak disetujui":
        message += 'Tidak disetujui';
        break;
    }

    return NextResponse.json({ message });

  } catch (error: any) {
    console.error(error);
    await client.query('ROLLBACK');
    return NextResponse.json({ message: 'Terjadi kesalahan', error: error.message }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function DELETE(request: Request) {
  try {

    const userId = request.headers.get('user_id')
    const role = request.headers.get('user_role')

    const { slug, status } = await request.json()

    let queryUser = role == 'provider' ? `WHERE slug = '${slug}' AND provider_id = '${userId}'` : `WHERE slug = '${slug}' AND user_id = '${userId}'`
    const query = `
      DELETE FROM "Bookings"
      ${queryUser}
      RETURNING slug;
    `
    const { rows } = await pool.query(query)
    const updated = rows[0].slug

    return NextResponse.json({ message: `Pesanan ${updated} berhasil dihapus` })

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}

