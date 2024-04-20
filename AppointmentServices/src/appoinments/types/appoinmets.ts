export type Appointment = {
  patientId: number;
  specialistId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
};
