import AppointmentModel from '../models/appoinmentsSchema';
import { Appointment } from '../types/appoinmets';

export class AppointmentRepository {
  async create(appointmentData: Appointment): Promise<Appointment> {
    try {
      const appointment = new AppointmentModel(appointmentData);
      return await appointment.save();
    } catch (error) {
      console.error(`Error al crear la cita médica:`, error);
      throw error;
    }
  }

  async findAll(): Promise<Appointment[]> {
    try {
      return await AppointmentModel.find().exec();
    } catch (error) {
      console.error(`Error al obtener todas las citas médicas:`, error);
      throw error;
    }
  }

  async findById(appointmentId: string): Promise<Appointment | null> {
    try {
      return await AppointmentModel.findById(appointmentId).exec();
    } catch (error) {
      console.error(`Error al buscar la cita médica por ID:`, error);
      throw error;
    }
  }

  async updateById(appointmentId: string, appointmentData: Appointment): Promise<Appointment | null> {
    try {
      return await AppointmentModel.findByIdAndUpdate(appointmentId, appointmentData, { new: true }).exec();
    } catch (error) {
      console.error(`Error al actualizar la cita médica por ID:`, error);
      throw error;
    }
  }

  async findByPatientId(patientId: string): Promise<Appointment[]> {
    try {
      return await AppointmentModel.find({ patientId }).exec();
    } catch (error) {
      console.error(`Error al buscar las citas médicas por ID de paciente:`, error);
      throw error;
    }
  }

  async findBySpecialistId(specialistId: string): Promise<Appointment[]> {
    try {
      return await AppointmentModel.find({ specialistId }).exec();
    } catch (error) {
      console.error(`Error al buscar las citas médicas por ID de especialista:`, error);
      throw error;
    }
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]> {
    try {
      return await AppointmentModel.find({ date: { $gte: startDate, $lte: endDate } }).exec();
    } catch (error) {
      console.error(`Error al buscar las citas médicas dentro del rango de fechas:`, error);
      throw error;
    }
  }

  async cancelById(appointmentId: string): Promise<Appointment | null> {
    try {
      return await AppointmentModel.findByIdAndUpdate(appointmentId, { status: 'cancelled' }, { new: true }).exec();
    } catch (error) {
      console.error(`Error al cancelar la cita médica por ID:`, error);
      throw error;
    }
  }

  async confirmById(appointmentId: string): Promise<Appointment | null> {
    try {
      return await AppointmentModel.findByIdAndUpdate(appointmentId, { status: 'confirmed' }, { new: true }).exec();
    } catch (error) {
      console.error(`Error al confirmar la cita médica por ID:`, error);
      throw error;
    }
  }
}
