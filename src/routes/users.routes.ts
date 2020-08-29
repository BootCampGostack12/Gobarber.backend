import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAthenticated from '../middlewares/ensureAthenticated';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });
        delete user.password;
        return response.status(200).json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch('/avatar', ensureAthenticated, async (request, respnse) => {
    return respnse.json({ ok: true });
});
export default usersRouter;
