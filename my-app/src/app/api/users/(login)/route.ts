export const dynamic = 'force-dynamic' // defaults to auto
import { sql } from "@vercel/postgres";
import {User} from "../../../../types/types"
var bcrypt = require('bcryptjs');

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    
    const {username , password} = await request.json()
    

    const { rows }: {rows: User[]} = await sql`SELECT * from "Users" where username=${username}`
    
    if (rows.length == 0) {
      return NextResponse.json({message: 'incorect username / password'},{status: 403})
    }

    const user = rows[0]
    
    const compare = bcrypt.compareSync(password ,user.password)

    if (!compare) {
      return NextResponse.json({message: 'incorect username / password'},{status: 403})
    }

    return NextResponse.json(user)

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}