// API Configuration
const API_BASE_URL = 'http://localhost:5001/api';

// Types matching your backend
export interface PatientLoginData {
  firstName: string;
  lastName: string;
  dob: string; // Format: "YYYY-MM-DD"
}

export interface DoctorLoginData {
  doctor_name: string;
  doctor_id: string;
  doctor_specialty: string;
}

export interface APIResponse<T> {
  message: string;
  user?: T;
  doctor?: T;
  physician?: T;
  error?: string;
}

// Patient Login/Signup Function
export const loginPatient = async (data: PatientLoginData): Promise<APIResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Login failed');
    }
    
    return result;
  } catch (error) {
    console.error('Patient login error:', error);
    throw error;
  }
};

// Doctor Login/Signup Function
export const loginDoctor = async (data: DoctorLoginData): Promise<APIResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/doctor-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Login failed');
    }
    
    return result;
  } catch (error) {
    console.error('Doctor login error:', error);
    throw error;
  }
};