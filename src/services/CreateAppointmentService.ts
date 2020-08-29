import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({
        provider_id,
        date,
    }: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );
        const startedDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            startedDate,
        );

        if (findAppointmentInSameDate) {
            throw new AppError('Este horário já está agendado!');
        }

        const appointmentTemp = appointmentsRepository.create({
            provider_id,
            date: startedDate,
        });

        await appointmentsRepository.save(appointmentTemp);

        return appointmentTemp;
    }
}

export default CreateAppointmentService;
