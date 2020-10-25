/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const createAppointmentService = new CreateAppointmentService();

  const parsedDate = parseISO(date);

  const appointmentTemp = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointmentTemp);
});

export default appointmentsRouter;
