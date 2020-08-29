import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();
        const user = await createUser.execute({ name, email, password });

        delete user.password;

        return response.status(200).json(user);
    } catch (error) {
        return response.status(400).json({ error: error.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const updateUserAvatarService = new UpdateUserAvatarService();
            const user = await updateUserAvatarService.execute({
                user_id: request.user.id,
                avatarFileName: request.file.filename,
            });

            delete user.password;

            return response.status(200).json(user);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },
);
export default usersRouter;
