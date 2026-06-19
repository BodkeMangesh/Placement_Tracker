"use client";

import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

export default function Home() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/jobs")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setJobs(data);
      })
      .catch((err) => console.error(err));

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

  const saveJob = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      return;
    }
  
  const updatedJobs = [...savedJobs, jobId];

    setSavedJobs(updatedJobs);

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(updatedJobs)
    );
  };

  const deleteJob = async (jobId: number) => {
     const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    await fetch(`http://localhost:8000/jobs/${jobId}`, {
      method: "DELETE",
    });

    setJobs(
      jobs.filter((job: any) => job.id !== jobId)
    );
    } catch (error) {
      console.error(error);
    } 
  };

  const filteredJobs = jobs.filter((job: any) => {
  const companyMatch = job.company
      .toLowerCase()
      .includes(search.toLowerCase());

  const locationMatch =
    location === "" || job.location === location;

  const typeMatch =
    jobType === "" || job.job_type === jobType;

  const salaryMatch =
    minSalary ==="" ||
    Number(job.salary) >= Number(minSalary);

    return companyMatch && locationMatch && typeMatch && salaryMatch;
  });

  const sortedJobs = [...filteredJobs].sort((a: any, b: any) => {

  const salaryA = Number(a.salary) || 0;
  const salaryB = Number(b.salary) || 0;

  if (sortOrder === "high") {
    return salaryB - salaryA;
  }

  if (sortOrder === "low") {
    return salaryA - salaryB;
  }

  return 0;
});

  return (
    <div className="container">
      <nav className="navbar">
      <h1 className="title">CareerRadar 🚀</h1>
      
      <div>
        <a href="#">Home</a>
        <a href="#">Jobs</a>
        <a href="#">About</a>
        <a href="/saved">Saved Jobs</a>
      </div>
      </nav>  

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{jobs.length}</h3>
          <p>Total Jobs</p>
        </div>

        <div className="stat-card">
          <h3>{new Set(jobs.map((job: any) => job.company)).size}</h3>
          <p>Companies</p>
        </div>

        <div className="stat-card">
          <h3>{new Set(jobs.map((job: any) => job.location)).size}</h3>
          <p>Locations</p>
        </div>

        <div className="stat-card">
          <h3>{savedJobs.length}</h3>
          <p>Saved Jobs</p>
        </div>
       </div> 

      <div>

      <p className="subtitle">
        Discover internships and jobs tailored for students.
      </p>

      <input className="search-box"
          type="text"
          placeholder="Search company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          
      />
      
      <select  className="location-select"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
       
      >
        <option value="">All Locations</option>
        <option value="Pune">Pune</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Bangalore">Bangalore</option>
      </select>

      <select className="type-select"
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
        
      >
          <option value="">All Types</option>
          <option value="Full Time">Full Time</option>
          <option value="Internship">Internship</option>
      </select>

      <input className="salary-input"
          type="number"
          placeholder="Min Salary"
          value={minSalary}
          onChange={(e) => setMinSalary(e.target.value)}
          
      />

      <select className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          
      >
        <option value="">Sort Salary</option>
        <option value="high">High → Low</option>
        <option value="low">Low → High</option>
      </select>

      <p>Total Jobs: {jobs.length}</p>
      
      <div className="jobs-grid">
      {sortedJobs.map((job: any) => (
        
        <JobCard 
          key ={job.id}
          job={job}
          onView={() => setSelectedJob(job)}
          onSave={() => saveJob(job.id)}
          onDelete={() => deleteJob(job.id)}
        />
      ))}
      </div>
      
      {selectedJob && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>{selectedJob.company}</h2>

            <p>
              <strong>Role:</strong> {selectedJob.role}
            </p>

            <p>
              <strong>Location:</strong> {selectedJob.location}
            </p>

            <p>
              <strong>Salary:</strong> {selectedJob.salary}
            </p>

            <p>
              <strong>Job Type:</strong> {selectedJob.job_type}
            </p>

            <p>
              <strong>Eligibility:</strong> {selectedJob.eligibility}
            </p>

            <p>
              <strong>Source:</strong> {selectedJob.source}
            </p>

           <button
              className="apply-btn"
              onClick={() => setSelectedJob(null)}
            >
               Close
            </button>

          </div>
        </div>
      )}

    </div>
    </div>
    );
  }