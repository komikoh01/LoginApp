import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/dist/server/api-utils";

type RefreshPayload = {
  id: number;
  type: string;
};

const ACCES_SECRET = "Wirzt_DeBruyne_Eriksen_Foden_Hazard";
const REFRESH_SECRET = "B.Fernandes_Vitinha_Deulofeu_Torres_Neymar";

const user = {
  email: "breyessrr@gmail.com",
  password: "FloWirtz7..",
  id: 1,
  name: "Bryan",
  role: "admin",
};

export async function GET(req: NextRequest) {
  const redirectTo = new URL(req.nextUrl).searchParams.get("redirect") || "/"
  const refreshToken = req.cookies.get("refreshToken")?.value;
 
  if(!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  try {
    jwt.verify(refreshToken, REFRESH_SECRET)

    const newAccessToken = jwt.sign({
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        type: "access",
      }, ACCES_SECRET, {
        expiresIn: "15m"
      }
    )

    const res = NextResponse.redirect(new URL(redirectTo, req.url))
    res.cookies.set({
      name: "accessToken",
      value: newAccessToken,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15
    })

    return res
  }catch(error: any) {
    if(error instanceof Error) {
      console.log(error)
      return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.redirect(new URL("/login", req.url))
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      {
        error: "No refresh token",
      },
      {
        status: 401,
      }
    );
  }

  try {
    // Verificar el Refresh Token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as RefreshPayload;

    if (decoded.type !== "refresh") {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    // Despues faltarian dos pasos ...
    // 1--- Encontrar primeramente el usuario con el mismo id que trae el refresh token
    // dbUser = db.find(user => user.id === decoded.sub)

    // if(!dbUSer) => {
    //   return NextResponse.json({message: "User not found"}, {status: 401})
    // }

    // 2--- Si los refresh tokens son iguales entonces sigue activo y puede renovar el access token sino es informado de la revocacion
    // if(dbUser.refreshToken !== refreshToken) {
    //   return NextResponse.json({message: " Refresh token revoked"}, {status: 401})
    // }

    // Rotacion
    const newAccessToken = jwt.sign(
      {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        type: "access",
      },
      ACCES_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const respone = NextResponse.json({
      message: "Token renewed successfully",
    });

    cookieStore.set({
      name: "accessToken",
      value: newAccessToken,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 15,
    });

    return respone;
  } catch (e: any) {
    if (e instanceof Error) {
      return NextResponse.json(
        { error: e.message },
        {
          status: 401,
        }
      );
    }
    NextResponse.json(
      {
        error: "Invalid refresh token",
      },
      { status: 401 }
    );
  }
}
