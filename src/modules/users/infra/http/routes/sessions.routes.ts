import { Router } from 'express';
import CreateSessionsService from '@modules/users/services/CreateSessionsService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const createSessionsService = new CreateSessionsService();
  const { user, token } = await createSessionsService.execute({
    email,
    password,
  });

  delete user.password;

  return response.status(200).json({ user, token });
});

export default sessionsRouter;
