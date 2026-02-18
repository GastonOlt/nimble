const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCandidateData = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);

    if (!response.ok) {
      throw new Error('Error al obtener los datos del candidato');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error en getCandidateData:", error);
    throw error;
  }
};

export const getJobs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText || 'No se pudieron obtener las vacantes'}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getJobs:", error);
    throw error;
  }
};

export const applyToJob = async (payload) => {
  try {
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error ${response.status}: No se pudo completar la postulación`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en applyToJob:", error);
    throw error;
  }
};