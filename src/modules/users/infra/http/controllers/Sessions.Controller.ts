import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateSessionsService from '@modules/users/services/CreateSessionsService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionsService = container.resolve(CreateSessionsService);

    const { user, token } = await createSessionsService.execute({
      email,
      password,
    });

    delete user.password;

    return response.status(200).json({ user, token });
  }
}

export default SessionsController;
