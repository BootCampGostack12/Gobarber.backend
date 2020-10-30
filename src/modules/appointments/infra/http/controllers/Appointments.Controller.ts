import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const parsedDate = parseISO(date);

    const appointmentTemp = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.status(200).json(appointmentTemp);
  }
}

export default AppointmentsController;
