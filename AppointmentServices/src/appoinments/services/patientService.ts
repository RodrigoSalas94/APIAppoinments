import axios, { AxiosRequestConfig } from 'axios';

export class PatientService {
  async checkPatientExistence(patientId: number, token: string): Promise<boolean> {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `${token}`,
        },
      };

      const response = await axios.get(`http://localhost:3000/patients/${patientId}`, config);

      return response.status === 200;
    } catch (error) {
      console.error('Error checking patient existence:', error);
      throw error;
    }
  }
}
