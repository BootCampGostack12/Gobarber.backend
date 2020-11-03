import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '8934972394723838948324',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('8934972394723838948324');

    expect(appointment).toHaveProperty('date');
  });
});

// describe('CreateAppointment', () => {
//   it('should not be able to create two appointment nthe same times', () => {
//     expect(1 + 6).toBe(7);
//   });
// });
