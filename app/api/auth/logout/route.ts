import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";

const REFRESH_SECRET = "B.Fernandes_Vitinha_Deulofeu_Torres_Neymar";

type RefreshPayload = {
  id: number;
  type: string;
};

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "No refresh token" }, { status: 401 });
  }

  const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as RefreshPayload;

  // Buscar y Eliminar el refresh token en la BD que pertenezca al usuario cuyo id es el mismo del refresh token enviado
  // const user = db.find(u => u.id === decoded.id)

  // if(!user) {
  //   return NextResponse.json({message: "No user founded"}, {status: 401})
  // }

  try {
    // db.delete(user.refreshToken)
  } catch {}

  const response = NextResponse.json("Success");

  response.cookies.set("accessToken", "", {maxAge: 0})
  response.cookies.set("refreshToken", "", { maxAge: 0 });

  return response;
}
