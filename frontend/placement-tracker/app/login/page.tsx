"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
    const response = await fetch(
      "http://localhost:8000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    alert(data.message);

    if (data.user) {
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      router.push("/");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <input className="search-box"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input className="search-box"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button 
        className="apply-btn"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}