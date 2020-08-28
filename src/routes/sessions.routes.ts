import { Router } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;
        const createSessionsService = new CreateSessionsService();
        const { user, token } = await createSessionsService.execute({
            email,
            password,
        });

        delete user.password;

        return response.status(200).json({ user, token });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
