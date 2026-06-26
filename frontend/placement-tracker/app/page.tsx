"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import JobCard from "../components/JobCard";


export default function Home() 
{
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => 
    {
      fetch("http://localhost:8000/jobs")
        .then((res) => res.json())
        .then((data) => {
          console.log("API DATA:", data);
            setJobs(data);
          })
        .catch((err) => console.error(err));

        const user = localStorage.getItem("user");

          if (user) {
            setIsLoggedIn(true);
          }

        const saved = localStorage.getItem("savedJobs");

        if (saved) {
          setSavedJobs(JSON.parse(saved));
        }
    }, []);

  const saveJob = (jobId: number) =>
  {
    const user = localStorage.getItem("user");

      if (!user) {
        alert("Please login first");
        router.push("/login");

        return;
      }

    const existingJobs = JSON.parse(
      localStorage.getItem("savedJobs") || "[]"
    );

    if (!existingJobs.includes(jobId)) {
    const updatedJobs = [...existingJobs, jobId];

        localStorage.setItem(
        "savedJobs",
        JSON.stringify(updatedJobs)
      );

      setSavedJobs(updatedJobs);

      alert("Job saved successfully ❤️");
    }
  };
  
  const handleApply = (job: any) => 
  { 

    const user = localStorage.getItem("user");

      if (!user) 
        {
          alert("Please login to apply");
          router.push("/login");
          return;
        }

    const appliedJobs = JSON.parse(
        localStorage.getItem("appliedJobs") || "[]"
    );
    
    if (!appliedJobs.includes(job.id)) {
      appliedJobs.push(job.id);

      localStorage.setItem(
      "appliedJobs",
      JSON.stringify(appliedJobs)
    );

      alert("Job marked as applied ✅");
    }

    window.open(job.link, "blank");
  };  

  const deleteJob = async (jobId: number) => 
  {
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

  const filteredJobs = jobs.filter((job: any) => 
  {
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

  const sortedJobs = [...filteredJobs].sort((a: any, b: any) => 
  {

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
      <h1 className="title">Placement Tracker🚀</h1>
      
      <div>
        <a href="#">Home</a>
        
        {isLoggedIn ?(
        <>
          <a href="/saved">Saved Jobs</a>
          <a href="/applied">Applied Jobs</a>
          <a href="/profile">Profile</a>
        </>
        ) : (
        <>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </>
        ) 
      }
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

        {/* <div className="stat-card">
          <h3>{savedJobs.length}</h3>
          <p>Saved Jobs</p>
        </div> */}
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
          onApply={() => handleApply(job)}
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
              <strong>Deadline:</strong> {selectedJob.deadline}
            </p>

            <p>
              <strong>Source:</strong> {selectedJob.source}
            </p>

            <button
                className="apply-btn"
                onClick={() => saveJob(selectedJob.id)}
            >
              Save Job
            </button>

            <button
                className="apply-btn"
                onClick={() => handleApply(selectedJob.id)}
            >
              Apply Now
            </button>

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