"use client"
import axios from "axios"
import { ChangeEvent, SubmitEvent } from "react" 
import { useState } from "react"

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async(e: SubmitEvent) => {
    e.preventDefault()
    const res = await axios.post("/api/auth/login", credentials)
    const data = await res.data
    console.log("Esto devolvio la api: ", data)
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
      <div>
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
      </div>
    </section>
  );
}
