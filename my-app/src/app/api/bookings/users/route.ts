export const dynamic = 'force-dynamic' // defaults to auto
import {Booking} from "../../../../types/types"

import { NextResponse } from "next/server";
import { pool } from "@/configDB/pg-config";

export async function GET(request: Request) {
  try {

    const userId = request.headers.get('user_id')


    const { rows }: {rows: Booking[]} = await pool.query(`
    SELECT 
      *
    FROM 
      "Bookings" b
    WHERE
      b.provider_id = ${userId}
    `)
    
    const bookings = rows

    return NextResponse.json(bookings)

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const userId = request.headers.get('user_id')
    
    const data = {
      ...body,
      user_id : userId,
      slug : 'book' + userId + 'buildings' + body.building_id + Math.random().toString().slice(-5)
    }
    
    let column = Object.keys(data).map(e=>`"${e}"`).join(', ')
    let value = Object.values(data).map(e=>`'${e}'`).join(', ')
    
     const insert = await pool.query(`
      INSERT INTO "Bookings"(${column})
      VALUES(${value});
    `)
    
    if (insert.rowCount == 1) {
      return NextResponse.json({message: 'success post booking'}, {status: 201})
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}

