export const dynamic = 'force-dynamic' // defaults to auto
import {User} from "../../../../../types/types"

import { NextResponse } from "next/server";
import { pool } from "@/configDB/pg-config";

export async function GET(request: Request, {params}: {params: {id: string}}) {
  try {
    const {id} = params
    
    const { rows }: {rows: User[]} = await pool.query(`
    SELECT 
    *
    FROM 
        "Users" u
    JOIN 
        "Bookings" bk ON u.id = bk.user_id
    JOIN 
        "Buildings" b ON bk.building_id = b.id
    WHERE 
        u.id = ${id}
    `)
    
    const user = rows[0]

    return NextResponse.json(user)

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}

export async function POST(request: Request) {
  try {
    const { rows } = await pool.query(`SELECT * from "Users" where id=1`)
    const user = rows[0] as User
    console.log(user)

    return NextResponse.json(user)

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}