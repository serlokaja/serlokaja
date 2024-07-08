import * as jose from 'jose'

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'rahasia';

interface JwtPayload {
  id: number,
  username: string,
  telp: string,
}

export async function signToken(payload: any) {
  try {
    const secret = new TextEncoder().encode(
      SECRET_KEY,
    )
    const token = await new jose.SignJWT(payload) // details to  encode in the token
      .setProtectedHeader({ alg: 'HS256' }) // algorithm
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret); // secretKey generated from previous step
    return token
  } catch (error) {
    console.log(error);
  }
}

export async function verifyToken(token: string) {
  // extract token from request
  try {
    const secret = new TextEncoder().encode(
      SECRET_KEY,
    )

    // verify token
    const { payload }: { payload: JwtPayload } = await jose.jwtVerify(token, secret, {
    })

    return payload
    // log values to console
  } catch (e) {
    // token verification failed
    console.log("Token is invalid");
  }
}
