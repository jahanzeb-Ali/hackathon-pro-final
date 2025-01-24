"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const { user, setUser, login } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    console.log(`User Data => ${user}`);
    if (user) {
      return router.replace("/");
    }
  }, [user]);
  async function handleSubmit(e) {
    e.preventDefault();
    await login(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex justify-center items-center h-screen bg-slate-400">
      <div className=" scale-90 p-3 rounded-lg shadow-lg shadow-grey-400 w-[40vw] bg-white">
        <h2 className="text-3xl font-bold text-center m-4"> Login </h2>
        <p className="text-center mb-3">enter your credentials to connect</p>

        <form className="grid gap-3" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow"
              required
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              required
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <div className="flex gap-2">
            <p>Don't have an account?</p>
            <Link href="/register" className="text-blue-700" replace={true}>
              register
            </Link>{" "}
          </div>
          <button
            className="btn w-[200px] m-auto btn-outline btn-primary"
            type="submit"
            // onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
