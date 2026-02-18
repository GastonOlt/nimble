import { useState } from 'react';
import { useToast } from '../context/ToastContext';

const JobItem = ({ job, onApply }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) return toast.error('Por favor, ingresa la URL de tu repositorio');
    
    // Validation for GitHub URL
    const githubRegex = /^https:\/\/github\.com\/[\w-]+\/[\w-.]+$/;
    if (!githubRegex.test(repoUrl.trim())) {
        toast.error('Por favor, ingresa una URL válida de GitHub (ej: https://github.com/usuario/repo)');
        return;
    }
    
    setIsSubmitting(true);
    await onApply(job.id, repoUrl);
    setIsSubmitting(false);
  };

  return (
    <div className="job-card">
      <div className="job-info">
        <h3>{job.title}</h3>
        <p className="job-id">ID: {job.id}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="apply-form">
        <input
          type="url"
          placeholder="https://github.com/tu-usuario/tu-repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          required
          className="repo-input"
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Enviando...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default JobItem;