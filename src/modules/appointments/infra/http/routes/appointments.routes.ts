/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAthenticated);

// appointmentsRouter.get('/', async (request, response) => {
// const appointments = await appointmentsRepository.find();
// return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const createAppointmentService = container.resolve(CreateAppointmentService);

  const parsedDate = parseISO(date);

  const appointmentTemp = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointmentTemp);
});

export default appointmentsRouter;
