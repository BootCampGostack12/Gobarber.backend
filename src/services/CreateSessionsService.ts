import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface RequestDTO {
    password: string;
    email: string;
}

interface Response {
    user: User;
    token: string;
}

class CreateSessionsService {
    public async execute({ email, password }: RequestDTO): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new Error('Email ou senha incorreta!');
        }
        const hashPassword = await compare(password, user.password);

        if (!hashPassword) {
            throw new Error('Email ou senha incorreta!');
        }
        // payload.secret_key.
        const token = sign({}, '761b21b02d88d0bb1df2785dd5fdfbf9', {
            subject: user.id,
            expiresIn: '1d',
        });

        return { user, token };
    }
}

export default CreateSessionsService;
