import { Document } from 'mongoose';
import { PatientRepository } from '../repositories/patientRepository';
import { Patient } from '../types/patient';

const patientRepository = new PatientRepository();

export class PatientService {
  async createPatient(patientData: Patient): Promise<Patient & Document> {
    try {
      return await patientRepository.createPatient(patientData);
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  }

  async findPatientById(patientId: string): Promise<(Patient & Document) | null> {
    try {
      return await patientRepository.findPatientById(patientId);
    } catch (error) {
      console.error('Error finding patient by ID:', error);
      throw error;
    }
  }

  async findAllPatients(): Promise<(Patient & Document)[]> {
    try {
      return await patientRepository.findAllPatients();
    } catch (error) {
      console.error('Error finding all patients:', error);
      throw error;
    }
  }

  async updatePatient(patientId: string, updates: Partial<Patient>): Promise<(Patient & Document) | null> {
    try {
      return await patientRepository.updatePatient(patientId, updates);
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  }

  async deletePatient(patientId: string): Promise<(Patient & Document) | null> {
    try {
      return await patientRepository.deletePatient(patientId);
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  }
}
