import axios, { AxiosRequestConfig } from 'axios';

export class SpecialistService {
  async checkSpecialistExistence(specialistId: string, token: string): Promise<boolean> {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `${token}`,
        },
      };

      const response = await axios.get(`http://localhost:3500/Specialist/${specialistId}`, config);

      return response.status === 200;
    } catch (error) {
      console.error('Error checking specialist existence:', error);
      throw error;
    }
  }
}
