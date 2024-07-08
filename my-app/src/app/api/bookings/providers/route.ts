export const dynamic = 'force-dynamic' // defaults to auto
import {Booking} from "../../../../types/types"

import { NextResponse } from "next/server";
import { pool } from "@/configDB/pg-config";

export async function GET(request: Request) {
  try {

    const providerId = request.headers.get('user_id')


    const { rows }: {rows: Booking[]} = await pool.query(`
    SELECT 
      *
    FROM 
      "Bookings" b
    WHERE
      b.provider_id = ${providerId}
    `)
    
    const Bookings = rows

    return NextResponse.json(Bookings)

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}




