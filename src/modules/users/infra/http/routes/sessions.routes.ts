import { Router } from 'express';
import CreateSessionsService from '@modules/users/services/CreateSessionsService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();

  const createSessionsService = new CreateSessionsService(usersRepository);

  const { user, token } = await createSessionsService.execute({
    email,
    password,
  });

  delete user.password;

  return response.status(200).json({ user, token });
});

export default sessionsRouter;
