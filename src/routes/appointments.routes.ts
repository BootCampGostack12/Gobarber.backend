/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import ensureAthenticated from '../middlewares/ensureAuthenticated';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAthenticated);

appointmentsRouter.get('/', async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
    const { provider_id, date } = req.body;
    const createAppointmentService = new CreateAppointmentService();

    const parsedDate = parseISO(date);

    const appointmentTemp = await createAppointmentService.execute({
        provider_id,
        date: parsedDate,
    });

    return res.json(appointmentTemp);
});

export default appointmentsRouter;
