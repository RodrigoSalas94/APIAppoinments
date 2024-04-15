import { Appointment } from '../types/appoinmets';
import { AppointmentRepository } from '../repositories/appoinmentRepository';
const appoinmentRepository = new AppointmentRepository();

export class AppointmentService {
  // Método para crear una nueva cita médica
  async createAppointment(appointmentData: Appointment): Promise<Appointment> {
    try {
      return await appoinmentRepository.create(appointmentData);
    } catch (error) {
      console.error('Error al crear la cita médica:', error);
      throw new Error('Error al crear la cita médica');
    }
  }

  // Método para obtener todas las citas médicas
  async getAllAppointments(): Promise<Appointment[]> {
    try {
      return await appoinmentRepository.findAll();
    } catch (error) {
      console.error('Error al obtener todas las citas médicas:', error);
      throw new Error('Error al obtener todas las citas médicas');
    }
  }

  // Método para buscar una cita médica por su ID
  async getAppointmentById(appointmentId: string): Promise<Appointment | null> {
    try {
      return await appoinmentRepository.findById(appointmentId);
    } catch (error) {
      console.error('Error al buscar la cita médica por ID:', error);
      throw new Error('Error al buscar la cita médica por ID');
    }
  }

  // Método para actualizar una cita médica por su ID
  async updateAppointmentById(appointmentId: string, appointmentData: Appointment): Promise<Appointment | null> {
    try {
      return await appoinmentRepository.updateById(appointmentId, appointmentData);
    } catch (error) {
      console.error('Error al actualizar la cita médica por ID:', error);
      throw new Error('Error al actualizar la cita médica por ID');
    }
  }

  // Método para buscar todas las citas médicas de un paciente
  async getAppointmentsByPatientId(patientId: string): Promise<Appointment[]> {
    try {
      return await appoinmentRepository.findByPatientId(patientId);
    } catch (error) {
      console.error('Error al buscar las citas médicas por ID de paciente:', error);
      throw new Error('Error al buscar las citas médicas por ID de paciente');
    }
  }

  // Método para buscar todas las citas médicas de un especialista
  async getAppointmentsBySpecialistId(specialistId: string): Promise<Appointment[]> {
    try {
      return await appoinmentRepository.findBySpecialistId(specialistId);
    } catch (error) {
      console.error('Error al buscar las citas médicas por ID de especialista:', error);
      throw new Error('Error al buscar las citas médicas por ID de especialista');
    }
  }

  // Método para buscar todas las citas médicas dentro de un rango de fechas
  async getAppointmentsByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]> {
    try {
      return await appoinmentRepository.findByDateRange(startDate, endDate);
    } catch (error) {
      console.error('Error al buscar las citas médicas dentro del rango de fechas:', error);
      throw new Error('Error al buscar las citas médicas dentro del rango de fechas');
    }
  }

  // Método para cancelar una cita médica por su ID
  async cancelAppointmentById(appointmentId: string): Promise<Appointment | null> {
    try {
      return await appoinmentRepository.cancelById(appointmentId);
    } catch (error) {
      console.error('Error al cancelar la cita médica por ID:', error);
      throw new Error('Error al cancelar la cita médica por ID');
    }
  }

  // Método para confirmar una cita médica por su ID
  async confirmAppointmentById(appointmentId: string): Promise<Appointment | null> {
    try {
      return await appoinmentRepository.confirmById(appointmentId);
    } catch (error) {
      console.error('Error al confirmar la cita médica por ID:', error);
      throw new Error('Error al confirmar la cita médica por ID');
    }
  }
}
