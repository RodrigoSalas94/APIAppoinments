export type Appointment = {
  patientId: string;
  specialistId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
};
