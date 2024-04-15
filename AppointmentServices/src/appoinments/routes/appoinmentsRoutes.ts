import express from 'express';
import { AppointmentController } from '../controllers/appoinmentControllers';
import { authenticateToken } from '../../utils/authUtils';

const appointmentRoutes = express.Router();
const appoinmentControllers = new AppointmentController();

appointmentRoutes.post('/appointments', authenticateToken, appoinmentControllers.createAppointment);
appointmentRoutes.get('/appointments', authenticateToken, appoinmentControllers.getAllAppointments);
appointmentRoutes.get('/appointments/:id', authenticateToken, appoinmentControllers.getAppointmentById);
appointmentRoutes.put('/appointments/:id', authenticateToken, appoinmentControllers.updateAppointmentById);
appointmentRoutes.delete('/appointments/:id', authenticateToken, appoinmentControllers.cancelAppointmentById);
appointmentRoutes.put('/appointments/:id/confirm', authenticateToken, appoinmentControllers.confirmAppointmentById);

export default appointmentRoutes;
