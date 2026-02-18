import { useState } from 'react';
import './App.css';
import { getCandidateData, getJobs, applyToJob } from './services/api';
import JobList from './components/JobList';
import { useToast } from './context/ToastContext';

function App() {
  const [email, setEmail] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [candidateData, setCandidateData] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const toast = useToast();

  const fetchJobs = async () => {
      try {
          const jobsData = await getJobs();
          setJobs(jobsData);
      } catch (err) {
          console.error("Error fetching jobs:", err);
          toast.error("No se pudieron cargar las ofertas de trabajo.");
      }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!inputEmail.trim()) {
        toast.error("Por favor ingresa un email válido.");
        return;
    }
    
    setLoading(true);

    try {
      const data = await getCandidateData(inputEmail);
      if (data) {
          setCandidateData(data);
          setEmail(inputEmail);
          toast.success(`¡Bienvenido de nuevo, ${data.firstName}!`);
          fetchJobs();
      } else {
          toast.error("No se encontró información para el email ingresado.");
      }
    } catch (err) {
      toast.error(err.message || "Error al verificar el cuenta.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId, repoUrl) => {
    try {
      const payload = {
        uuid: candidateData.uuid,
        jobId: jobId,
        candidateId: candidateData.candidateId,
        repoUrl: repoUrl,
      };

      const result = await applyToJob(payload);

      if (result.ok) {
        toast.success("¡Postulación enviada con éxito!");
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="app-title">Nimble Gravity</h1>
        <p className="app-subtitle">Portal de Candidatos — Challenge</p>
      </header>

      {!candidateData ? (
         <div className="email-form-container">
            <div className="email-card">
                <h2>Bienvenido</h2>
                <p>Ingresa tu email para acceder a las postulaciones.</p>
                <form onSubmit={handleLogin} className="email-form">
                    <input 
                        type="email" 
                        placeholder="tu-email@ejemplo.com" 
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                        className="email-input"
                        required
                    />
                    <button type="submit" className="email-submit-btn" disabled={loading}>
                        {loading ? 'Verificando...' : 'Ingresar'}
                    </button>
                </form>
            </div>
         </div>
      ) : (
        <>
            <div className="candidate-welcome">
                <h2>¡Hola, {candidateData.firstName}!</h2>
                <p>Selecciona una posición para enviar tu postulación. (Logueado como: {email})</p>
            </div>
            {loading ? <div className="loading-state">Cargando vacantes...</div> : <JobList jobs={jobs} onApply={handleApply} />}
        </>
      )}
    </div>
  );
}

export default App;