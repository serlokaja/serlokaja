import { pool } from "@/configDB/pg-config"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    let query = `
      SELECT 
      *
      FROM "Facilities"
    `

    const { rows } = await pool.query(query)

    const facilities = rows

    return NextResponse.json(facilities)

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 })
  }
}