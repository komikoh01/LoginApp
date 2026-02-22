import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const token = (await cookies()).get("accessToken")
  const pathname = (await headers()).get("next-url")

  if(!token) redirect("/api/auth/refresh?redirect=/")

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-slate-950 font-sans gap-4">
      <div className=" flex flex-col">
        <h1 className=" text-3xl text-violet-900 font-semibold">Home Page</h1>
        <h1 className=" text-3xl text-violet-600 font-semibold">Bienvenido a mi login app</h1>
      </div>
      <Link href={"/dashboard"} className=" text-lg text-blue-700 hover:text-cyan-300 font-semibold">Go to Dashboard</Link>
    </div>
  );
}
