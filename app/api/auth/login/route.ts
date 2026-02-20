import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ACCES_SECRET = "Wirzt_DeBruyne_Eriksen_Foden_Hazard";
const REFRESH_SECRET = "B.Fernandes_Vitinha_Deulofeu_Torres_Neymar";

const user = {
  email: "breyessrr@gmail.com",
  password: "FloWirtz7..",
  id: 1,
  name: "Bryan",
  role: "admin",
};

const ACCES_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Wrong email or password" },
        { status: 400 },
      );
    }

    if (
      String(email).toLowerCase() !== user.email.toLowerCase() ||
      String(password) !== user.password
    ) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        {
          status: 401,
        },
      );
    }

    // Payload del Access --- lo que se valida en cada peticion protegida
    const accessPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      type: "access"
    }

    // Payload del Refresh --- minimo dato posible
    const refreshPayload = {
      sub: user.id,
      type: "refresh"
    }

    const accessToken = jwt.sign(accessPayload, ACCES_SECRET, {
      expiresIn: ACCES_TOKEN_EXPIRY
    })

    const refreshToken = jwt.sign(refreshPayload, REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY
    })

    const response = NextResponse.json({
      message: "Login successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    })

    response.cookies.set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15
    })

    response.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 // 7 dias en segundos
    })

    return response

  } catch (e: any) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      },
    );
  }
}
