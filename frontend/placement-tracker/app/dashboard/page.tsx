"use client";

import styles from "./dashboard.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() 
{
    const router = useRouter();
    
    const [user, setUser] = useState<any>(null);

    const [appliedCount, setAppliedCount] = useState(0);

    const [savedCount, setSavedCount] = useState(0);
    
  
    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };
  
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

        setSavedCount(savedJobs.length);

        const appliedJobs = JSON.parse(
            localStorage.getItem("appliedJobs") || "[]"
        );

            setAppliedCount(appliedJobs.length);

    }, [router]);

    return (
        <div className={styles.dashboard}> 
             <div className="container">
                {user && (
                <>
                    <div className={styles.userdashboard}>
                        <h2>Hii, {user.name} 👋</h2>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                    </div>
                
                    <div className={styles.statsGrid}>
                
                        <div className={styles.card}>
                            <h3>Saved Jobs</h3>
                            <p>{savedCount}</p>
                        </div>

                        <div className={styles.card}>
                            <h3>Applications</h3>
                            <p>{appliedCount}</p>
                        </div>

                        <div className={styles.card}>
                            <h3>Profile Status</h3>
                            <p>Active</p>
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button
                            className="apply-btn"
                            onClick={() => router.push("/saved")}
                        >
                            View Saved Jobs
                        </button>

                        <button
                            className="apply-btn"
                            onClick={() => router.push("/applied")}
                        >
                            View Applied Jobs
                        </button>

                        <button
                            className={`apply-btn ${styles.logoutBtn}`}
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                    
                </>
                )}
            </div>
        </div>
    );
}