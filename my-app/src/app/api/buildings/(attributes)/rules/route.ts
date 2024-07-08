import { pool } from "@/configDB/pg-config"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    let query = `
      SELECT 
      *
      FROM "Rules"
    `

    const { rows } = await pool.query(query)

    const rules = rows

    return NextResponse.json(rules)

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 })
  }
}