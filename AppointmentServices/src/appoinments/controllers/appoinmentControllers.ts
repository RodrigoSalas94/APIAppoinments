import { Request, Response, NextFunction } from 'express';
import { Appointment } from '../types/appoinmets';
import { AppointmentService } from '../services/appoinmentsService';
import { PatientService } from '../services/patientService';
import { SpecialistService } from '../services/specialistService';
const appoinmentsService = new AppointmentService();
const patientService = new PatientService();
const specialistService = new SpecialistService();

export class AppointmentController {
  async createAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const appointmentData: Appointment = req.body;
      const { patientId, specialistId } = appointmentData;

      const isPatientExists = await patientService.checkPatientExistence(+patientId, req.headers.authorization || '');
      if (!isPatientExists) {
        const error = new Error('Patient does not exist');
        error.name = 'NotFound';
        throw error;
      }

      const isSpecialistExists = await specialistService.checkSpecialistExistence(
        specialistId,
        req.headers.authorization || ''
      );
      if (!isSpecialistExists) {
        const error = new Error('Specialist does not exist');
        error.name = 'NotFound';
        throw error;
      }

      const newAppointment = await appoinmentsService.createAppointment(appointmentData);
      res.status(201).json(newAppointment);
    } catch (error) {
      console.error('Error creating appointment:', error);
      next(error);
    }
  }

  async getAllAppointments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const appointments = await appoinmentsService.getAllAppointments();
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error getting all appointments:', error);
      next(error);
    }
  }

  async getAppointmentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const appointmentId: string = req.params.id;
      const appointment = await appoinmentsService.getAppointmentById(appointmentId);
      res.status(200).json(appointment);
    } catch (error) {
      console.error('Error getting appointment by ID:', error);
      next(error);
    }
  }

  async updateAppointmentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const appointmentId: string = req.params.id;
      const appointmentData: Appointment = req.body;
      const updatedAppointment = await appoinmentsService.updateAppointmentById(appointmentId, appointmentData);
      res.status(200).json(updatedAppointment);
    } catch (error) {
      console.error('Error updating appointment by ID:', error);
      next(error);
    }
  }

  async cancelAppointmentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const appointmentId: string = req.params.id;
      const cancelledAppointment = await appoinmentsService.cancelAppointmentById(appointmentId);
      res.status(200).json(cancelledAppointment);
    } catch (error) {
      console.error('Error cancelling appointment by ID:', error);
      next(error);
    }
  }

  async confirmAppointmentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const appointmentId: string = req.params.id;
      const confirmedAppointment = await appoinmentsService.confirmAppointmentById(appointmentId);
      res.status(200).json(confirmedAppointment);
    } catch (error) {
      console.error('Error confirming appointment by ID:', error);
      next(error);
    }
  }
}
