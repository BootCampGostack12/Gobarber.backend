import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';

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

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return { user, token };
    }
}

export default CreateSessionsService;
