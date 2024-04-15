import mongoose, { Document, Schema } from 'mongoose';
import { Patient } from '../types/patient';
import { mongoUrl } from '../../connections/database';
mongoose.connect(mongoUrl);

const patientSchema: Schema<Patient & Document> = new Schema({
  patientId: {
    type: Number,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    street: String,
    city: String,
    postalCode: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
});

const PatientModel = mongoose.model<Patient & Document>('Patient', patientSchema);

export default PatientModel;
