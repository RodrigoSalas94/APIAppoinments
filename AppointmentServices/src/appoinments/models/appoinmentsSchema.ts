import mongoose, { Schema, Document } from 'mongoose';
import { mongoUrl } from '../../connections/database';
import { Appointment } from '../types/appoinmets';
mongoose.connect(mongoUrl);
const appointmentSchema: Schema = new Schema({
  patientId: { type: Schema.Types.ObjectId, required: true },
  specialistId: { type: String, ref: 'Specialist', required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
});

const AppointmentModel = mongoose.model<Appointment & Document>('Appointment', appointmentSchema);

export default AppointmentModel;
