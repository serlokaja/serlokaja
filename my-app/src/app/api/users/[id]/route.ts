export const dynamic = 'force-dynamic' // defaults to auto
import { sql, QueryResultRow } from "@vercel/postgres";
import {User} from "../../../../types/types"

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { rows }: {rows: User[]} = await sql`SELECT * from "Users" where id=1`

    const user = rows[0]
    console.log(user)

    return NextResponse.json(user)

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}

export async function POST(request: Request) {
  try {
    const { rows } = await sql`SELECT * from "Users" where id=1`

    const user = rows[0] as User
    console.log(user)

    return NextResponse.json(user)

  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}