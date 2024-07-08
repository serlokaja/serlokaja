import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './helpers/jwt';
import { cookies } from 'next/headers';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const isAuthPage = request.nextUrl.pathname.startsWith('/api/auth/')
  const isCarrouselPage = request.nextUrl.pathname.startsWith('/api/carrousels')
  const isBuildingUserPage = request.nextUrl.pathname.startsWith('/api/buildings/users')
  const isimage = request.nextUrl.pathname.startsWith('/api/image')

  if (isAuthPage || isCarrouselPage || isBuildingUserPage || isimage) {
    return NextResponse.next()
  }

  const access_token = cookies().get('Authorization') as any
  if (!access_token) {
    return NextResponse.json({ "message": "Unauthorzied / Auth timeout" }, { status: 401 })
  }

  const token = access_token.value
  const payload = await verifyToken(token) as any
  if (!payload?.id) {
    return NextResponse.json({ "message": "invalid token" }, { status: 401 })
  }
  const id: string = payload?.id?.toString()
  const role: string = payload?.role?.toString()
  const email: string = payload?.email?.toString()

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('user_id', id)
  requestHeaders.set('user_role', role)
  requestHeaders.set('user_email', email)
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/api/:path*',
  ],

}