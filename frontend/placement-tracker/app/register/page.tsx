"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
      const response = await fetch(
        "http://localhost:8000/register",
        {
          method: "POST",
          headers: {
           "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );
      console.log("Status:", response.status);

      const text = await response.text();

      console.log("Response:", text);

      alert(text);

      if (response.ok) {
        router.push("/login");
      }
    }; 
      
  return (
    <div className="container">
      <h1>Register</h1>

      <input className="search-box"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)} 
      />

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
        onClick={handleRegister}
        >
        Register
      </button>
    </div>
  );
}