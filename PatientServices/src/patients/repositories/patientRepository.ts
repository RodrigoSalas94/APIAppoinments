import { Document } from 'mongoose';
import PatientModel from '../models/patientSchema';
import { Patient } from '../types/patient';

export class PatientRepository {
  async createPatient(patientData: Patient): Promise<Patient & Document> {
    try {
      return await PatientModel.create(patientData);
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  }

  async findPatientById(patientId: string): Promise<(Patient & Document) | null> {
    try {
      return await PatientModel.findById(patientId);
    } catch (error) {
      console.error('Error finding patient by ID:', error);
      throw error;
    }
  }

  async findAllPatients(): Promise<(Patient & Document)[]> {
    try {
      return await PatientModel.find();
    } catch (error) {
      console.error('Error finding all patients:', error);
      throw error;
    }
  }

  async updatePatient(patientId: string, updates: Partial<Patient>): Promise<(Patient & Document) | null> {
    try {
      return await PatientModel.findByIdAndUpdate(patientId, updates, { new: true });
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  }

  async deletePatient(patientId: string): Promise<(Patient & Document) | null> {
    try {
      return await PatientModel.findByIdAndDelete(patientId);
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw error;
    }
  }
}
