import AppointmentModel from '../models/appoinmentsSchema';
import { Appointment } from '../types/appoinmets';

export class AppointmentRepository {
  // Método para crear una nueva cita médica
  async create(appointmentData: Appointment): Promise<Appointment> {
    try {
      const appointment = new AppointmentModel(appointmentData);
      return await appointment.save();
    } catch (error) {
      console.error(`Error al crear la cita médica:`, error);
      throw error;
    }
  }

  // Método para obtener todas las citas médicas
  async findAll(): Promise<Appointment[]> {
    try {
      return await AppointmentModel.find().exec();
    } catch (error) {
      console.error(`Error al obtener todas las citas médicas:`, error);
      throw error;
    }
  }

  // Método para buscar una cita médica por su ID
  async findById(appointmentId: string): Promise<Appointment | null> {
    try {
      return await AppointmentModel.findById(appointmentId).exec();
    } catch (error) {
      console.error(`Error al buscar la cita médica por ID:`, error);
      throw error;
    }
  }

  // Método para actualizar una cita médica por su ID
  async updateById(appointmentId: string, appointmentData: Appointment): Promise<Appointment | null> {
    try {
      return await AppointmentModel.findByIdAndUpdate(appointmentId, appointmentData, { new: true }).exec();
    } catch (error) {
      console.error(`Error al actualizar la cita médica por ID:`, error);
      throw error;
    }
  }

  // Método para buscar todas las citas médicas de un paciente
  async findByPatientId(patientId: string): Promise<Appointment[]> {
    try {
      return await AppointmentModel.find({ patientId }).exec();
    } catch (error) {
      console.error(`Error al buscar las citas médicas por ID de paciente:`, error);
      throw error;
    }
  }

  // Método para buscar todas las citas médicas de un especialista
  async findBySpecialistId(specialistId: string): Promise<Appointment[]> {
    try {
      return await AppointmentModel.find({ specialistId }).exec();
    } catch (error) {
      console.error(`Error al buscar las citas médicas por ID de especialista:`, error);
      throw error;
    }
  }

  // Método para buscar todas las citas médicas dentro de un rango de fechas
  async findByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]> {
    try {
      return await AppointmentModel.find({ date: { $gte: startDate, $lte: endDate } }).exec();
    } catch (error) {
      console.error(`Error al buscar las citas médicas dentro del rango de fechas:`, error);
      throw error;
    }
  }

  // Método para cancelar una cita médica por su ID
  async cancelById(appointmentId: string): Promise<Appointment | null> {
    try {
      return await AppointmentModel.findByIdAndUpdate(appointmentId, { status: 'cancelled' }, { new: true }).exec();
    } catch (error) {
      console.error(`Error al cancelar la cita médica por ID:`, error);
      throw error;
    }
  }

  // Método para confirmar una cita médica por su ID
  async confirmById(appointmentId: string): Promise<Appointment | null> {
    try {
      return await AppointmentModel.findByIdAndUpdate(appointmentId, { status: 'confirmed' }, { new: true }).exec();
    } catch (error) {
      console.error(`Error al confirmar la cita médica por ID:`, error);
      throw error;
    }
  }
}
