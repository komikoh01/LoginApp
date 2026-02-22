import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import axios from "axios";

type AccessPayload = {
  sub: number
  name: string
  email: string
  role: string
  type: string
};

export async function middleware(req: NextRequest) {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) return NextResponse.redirect(new URL("/login", req.url))

  try {
    jwtVerify<AccessPayload>(
      accessToken,
      new TextEncoder().encode("Wirzt_DeBruyne_Eriksen_Foden_Hazard")
    ); // Esta es la firma secreta del Access Token
    return NextResponse.next();
  } catch (error: any) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.redirect(new URL("/login", req.url));
    }
    console.log(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

}

export const config = {
  matcher: ["/dashboard"],
};
