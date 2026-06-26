type JobProps = {
  job: any;
  onView: () => void;
  onSave: () => void;
  onDelete: () => void;
  onApply: () => void;
};

export default function JobCard({ job, onView,  onSave, onDelete, onApply}: JobProps) {

  const today = new Date();

  const deadline = new Date(job.deadline);

  const diffTime = deadline.getTime() - today.getTime();
  
  const formattedDeadline = deadline.toLocaleDateString("en-IN" , {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  const daysLeft = Math.ceil(
    diffTime / (1000 * 60 * 60 * 24)
  );
  
  return (
    <div className="job-card">
      <h2 className="company-name">
        {job.company}
      </h2>

      <p className="job-role">
        {job.role}
      </p>

      <div className="job-details">
        <span>📍 {job.location}</span>
        <span>💰 {job.salary}</span>
        <span>💼 {job.job_type}</span>
      </div>

      <p>
        <strong>Eligibility:</strong> {job.eligibility}
      </p>

      <p>
        <strong>Source:</strong> {job.source}
      </p>

      <p>
        <strong> Deadline:</strong> {formattedDeadline}
      </p>

      <p>
        <strong>Days Left:</strong> 
         {daysLeft > 1 && (
             <>⏳ {daysLeft} Days Left</>
          )}

          {daysLeft === 1 && (
            <>⚠️ Last Day to Apply</>
          )}

          {daysLeft === 0 && (
            <>🔥 Apply Today</>
          )}

          {daysLeft < 0 && (
            <>❌ Deadline Expired</>
          )}
      </p>

        <button
            className="apply-btn"
            onClick={onView}
            style={{ marginRight: "10px" }}
        >
        View Details
        </button>

        <button
            className="apply-btn"
            onClick={onSave}
            style={{ marginRight: "10px" }}
        >
            Save Job
        </button>

        <button
            className="apply-btn"
            onClick={onDelete}
          >
          Delete
        </button>
        

        <button 
            className="apply-btn"
            onClick={onApply}
        >
          Apply Now
        </button>
    </div>
  );
}