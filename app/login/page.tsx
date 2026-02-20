"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { ChangeEvent, SubmitEvent } from "react" 
import { useState } from "react"

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })
  const router = useRouter()

  const handleSubmit = async(e: SubmitEvent) => {
    e.preventDefault()
    const res = await axios.post("/api/auth/login", credentials)
    const data = await res.data
    
    if(res.status !== 200) {
      throw new Error("Error en la solicitud")
    }
    console.log(data)
    router.push("/")
  }

  const handleLogout = async() => {
    const res = await axios.post("/api/auth/logout")
    const data = await res.data
    console.log(data)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: [e.target.value]
    })
  }

  return (
    <section className=" flex flex-col items-center px-10 py-5 gap-8 min-h-dvh">
      <h1 className=" custom-h1">Login Page</h1>
      <div className=" flex flex-col gap-4 p-4">
        <form onSubmit={handleSubmit} className=" w-[300px] h-[300px] bg-slate-950 rounded-xl border-2 border-slate-800 flex flex-col justify-center items-center p-5 gap-4">
          <input
            onChange={handleChange}
            name="email"
            type="email"
            className=" px-2 py-1 border-b-2 border-b-cyan-300 bg-slate-800 rounded-lg"
          />
          <input
            onChange={handleChange}
            name="password"
            type="password"
            className=" px-2 py-1 border-b-2 border-b-cyan-300 bg-slate-800 rounded-lg"
          />
          <button className=" w-[200px] py-2 px-3 bg-cyan-500 hover:bg-cyan-700 transition-colors delay-75 text-center rounded-xl">Login</button>
        </form>
        <button onClick={handleLogout} className=" text-center text-xl px-2 py-1 bg-red-600 hover:bg-red-900 transition-colors delay-75 rounded-xl">Logout</button>
      </div>
    </section>
  );
}
