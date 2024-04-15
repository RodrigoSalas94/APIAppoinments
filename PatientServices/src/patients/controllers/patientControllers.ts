import { Request, Response, NextFunction } from 'express';
import { AuthenticationRequest } from '../types/web/request';
import { PatientService } from '../services/patientServices';

const patientService = new PatientService();

export class PatientController {
  async createPatient(req: AuthenticationRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const patientId = req.user.id;

      const patientData = req.body;

      patientData.patientId = patientId;

      const newPatient = await patientService.createPatient(patientData);

      res.status(201).json(newPatient);
    } catch (error) {
      console.error('Error creating patient:', error);
      next(error);
    }
  }

  async getPatientById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const patientId = req.params.id;
      const patient = await patientService.findPatientById(patientId);
      res.json(patient);
    } catch (error) {
      console.error('Error finding patient by ID:', error);
      next(error);
    }
  }

  async getAllPatients(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const patients = await patientService.findAllPatients();
      res.json(patients);
    } catch (error) {
      console.error('Error finding all patients:', error);
      next(error);
    }
  }

  async updatePatient(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const patientId = req.params.id;
      const updates = req.body;
      const updatedPatient = await patientService.updatePatient(patientId, updates);
      res.json(updatedPatient);
    } catch (error) {
      console.error('Error updating patient:', error);
      next(error);
    }
  }

  async deletePatient(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const patientId = req.params.id;
      await patientService.deletePatient(patientId);
      res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
      console.error('Error deleting patient:', error);
      next(error);
    }
  }
}
