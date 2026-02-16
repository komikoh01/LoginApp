import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

const ACCES_SECRET = "Wirzt_DeBruyne_Eriksen_Foden_Hazard";
const REFRESH_SECRET = "B.Fernandes_Vitinha_Deulofeu_Torres_Neymar";

const user = {
  email: "breyessrr@gmail.com",
  password: "FloWirtz7..",
  id: 1,
  name: "Bryan",
  role: "admin",
};

export async function POST(req: NextRequest) {
  try{
    const refreshToken = req.cookies.get("refreshToken")?.value

    if(!refreshToken) {
      return NextResponse.json({
        error: "No refresh token"
      }, {
        status: 401
      })
    }

    // Verificar el Refresh Token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as any

    if(decoded.type !== "refresh") {
      return NextResponse.json({ error: "Invalid Token"}, { status: 401})
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
    const newAccessToken = jwt.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      type: "access"
    }, ACCES_SECRET, {
      expiresIn: "15m"
    })

    const respone = NextResponse.json({ message: "Token renewed successfully",
      accesstoken: newAccessToken
    })

    return respone

  }catch(e: any) {
    if(e instanceof Error) {
      return NextResponse.json({ error: e.message}, {
        status: 500
      })
    }
    NextResponse.json({
      error: "Internal Server Error"
    }, { status: 500})
  }
}