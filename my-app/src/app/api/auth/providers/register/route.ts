export const dynamic = 'force-dynamic' // defaults to auto
import {User} from "../../../../../types/types"
import bcrypt from 'bcryptjs'

import { NextResponse } from "next/server";
import { pool } from "@/configDB/pg-config";

export async function POST(request: Request) {
  try {
    
    const {email, telp, password} = await request.json()
    
    if (!email) {
      return NextResponse.json({message: 'please input email'},{status: 400})
    }

    if (!password) {
      return NextResponse.json({message: 'please input password'},{status: 400})
    }

    const { rows }: {rows: User[]} = await pool.query(`SELECT * from "Providers" where email='${email}'`)
    
    if (rows.length != 0) {
      return NextResponse.json({message: 'email already exist'},{status: 400})
    }

    const hash = bcrypt.hashSync(password, 10)
    
    const insert = await pool.query(`INSERT INTO "Providers" 
    ("email","telp", "password")
    VALUES
    ('${email}', '${telp}', '${hash}')
    `)
    return NextResponse.json({message: 'success to register provider'})

  } catch (error) {
    console.log(error);
    return NextResponse.json({message: error}, {status: 500})
  }
}