"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [savedCount, setSavedCount] = useState(0);
  const [appliedCount, setAppliedCount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));

    const savedJobs = JSON.parse(
      localStorage.getItem("savedJobs") || "[]"
    );

    const appliedJobs = JSON.parse(
      localStorage.getItem("appliedJobs") || "[]"
    );

    setSavedCount(savedJobs.length);
    setAppliedCount(appliedJobs.length);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="container">
      <h1>My Profile 👤</h1>

      {user && (
        <>
          <div className="job-card">
            <h2>{user.name}</h2>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>

            <p>
              <strong>Status:</strong> Active ✅
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>{savedCount}</h3>
              <p>Saved Jobs ❤️</p>
            </div>

            <div className="stat-card">
              <h3>{appliedCount}</h3>
              <p>Applied Jobs 🚀</p>
            </div>

            <div className="stat-card">
              <h3>2026</h3>
              <p>Member Since 📅</p>
            </div>
          </div>

          <button
            className="apply-btn"
            onClick={() => router.push("/saved")}
          >
            View Saved Jobs
          </button>

          <button
            className="apply-btn"
            onClick={() => router.push("/applied")}
            style={{ marginLeft: "10px" }}
          >
            View Applied Jobs
          </button>

          <br />
          <br />

          <button
            className="apply-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}