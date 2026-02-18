import JobItem from './JobItem';

const JobList = ({ jobs, onApply }) => {
  if (jobs.length === 0) return <p>No hay posiciones disponibles en este momento.</p>;

  return (
    <div className="job-list-container">
      {jobs.map((job) => (
        <JobItem 
          key={job.id} 
          job={job} 
          onApply={onApply} 
        />
      ))}
    </div>
  );
};

export default JobList;