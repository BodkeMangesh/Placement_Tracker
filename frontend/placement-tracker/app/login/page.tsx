"use client";

export default function LoginPage() {
  return (
    <div className="container">
      <h1>Login</h1>

      <input className="search-box"
        type="email"
        placeholder="Email"
      />

      <input className="search-box"
        type="password"
        placeholder="Password"
      />

      <button className="apply-btn">
        Login
      </button>
    </div>
  );
}