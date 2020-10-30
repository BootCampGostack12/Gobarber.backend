import { Router } from 'express';
import AppointmentController from '../controllers/Appointments.Controller';
import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(ensureAthenticated);

// appointmentsRouter.get('/', async (request, response) => {
// const appointments = await appointmentsRepository.find();
// return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
