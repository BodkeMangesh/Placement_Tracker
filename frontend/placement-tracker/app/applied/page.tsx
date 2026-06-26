"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  

export default function AppliedJobsPage() {
  const router = useRouter();

  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user");

      if (!user) {
        router.push("/login");
        return;
      }
   
    const applied = localStorage.getItem("appliedJobs");

    if (applied) {
      setAppliedJobs(JSON.parse(applied));
    }
   }, [router]);

  useEffect(() => {
    fetch("http://localhost:8000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  const appliedJobData = jobs.filter((job: any) =>
    appliedJobs.includes(job.id)
  );

  const removeAppliedJob = (jobId: number) => {
    const updatedJobs = appliedJobs.filter(
      (id) => id !== jobId
    );

    setAppliedJobs(updatedJobs);

    localStorage.setItem(
      "appliedJobs",
      JSON.stringify(updatedJobs)
    );
  };

  return (
    <div className="container">
      <h1 className="title">Applied Jobs 🚀</h1>

      <p>Total Applied Jobs: {appliedJobs.length}</p>

      {appliedJobData.map((job: any) => (
        <div
          key={job.id}
          className="job-card"
        >
          <h2 className="company-name">
            {job.company}
          </h2>

          <p className="job-role">
            {job.role}
          </p>

          <p>📍 {job.location}</p>

          <p>💰 {job.salary}</p>

          <button
            className="apply-btn"
            onClick={() =>
              removeAppliedJob(job.id)
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}