import express from 'express';
import { PatientController } from '../controllers/patientControllers';
import { authenticateToken } from '../../utils/authUtils';

const patientRoutes = express.Router();
const patientController = new PatientController();

patientRoutes.post('/patients', authenticateToken, patientController.createPatient);
patientRoutes.get('/patients/:id', authenticateToken, patientController.getPatientById);
patientRoutes.get('/patients', authenticateToken, patientController.getAllPatients);
patientRoutes.put('/patients/:id', authenticateToken, patientController.updatePatient);
patientRoutes.delete('/patients/:id', authenticateToken, patientController.deletePatient);

export default patientRoutes;
