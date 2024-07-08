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
        "Providers" p
    JOIN
        "Buildings" b ON b.provider_id = p.id
    WHERE 
        p.id = ${id}
    `)
    
    const user = rows

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

    return NextResponse.json(user)

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}