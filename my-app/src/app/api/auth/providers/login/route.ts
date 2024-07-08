export const dynamic = 'force-dynamic' // defaults to auto
import { User } from "../../../../../types/types"
var bcrypt = require('bcryptjs');

import { NextResponse } from "next/server";
import { signToken } from "@/helpers/jwt";
import { pool } from "@/configDB/pg-config";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const { rows }: { rows: User[] } = await pool.query(`SELECT * from "Providers" where email='${email}'`)

    if (rows.length == 0) {
      return NextResponse.json({ message: 'incorect email / password' }, { status: 403 })
    }

    const user = rows[0]

    const compare = bcrypt.compareSync(password, user.password)

    if (!compare) {
      return NextResponse.json({ message: 'incorect email / password' }, { status: 403 })
    }

    const access_token: string | undefined = await signToken({ ...user, role: "provider" })

    if (access_token) {
      let oneMinute = 60 * 60 * 1000
      cookies().set('Authorization', access_token, { expires: Date.now() + oneMinute, secure: true, sameSite: true, httpOnly: true })
      return NextResponse.json({ message: "Login success" })
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}