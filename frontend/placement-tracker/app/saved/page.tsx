"use client";

import { useEffect, useState } from "react";

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("savedJobs");

    if (saved) {
      setSavedJobs(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  const savedJobData = jobs.filter((job: any) =>
    savedJobs.includes(job.id)
  );

  const removeSavedJob = (jobId: number) => {
    const updatedJobs = savedJobs.filter(
      (id) => id !== jobId
    );

    setSavedJobs(updatedJobs);

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedJobs)
    );
  };

  return (
    <div className="container">
      <h1 className="title">Saved Jobs ❤️</h1>

      <p>Total Saved Jobs: {savedJobs.length}</p>

      {savedJobData.map((job: any) => (
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
            onClick={() => removeSavedJob(job.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}