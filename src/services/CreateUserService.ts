import { getRepository } from 'typeorm';
import User from '../models/User';

interface RequestDTO {
    name: string;
    password: string;
    email: string;
}

class CreateAppointmentService {
    public async execute({ name, email, password }: RequestDTO): Promise<User> {
        const usersRepository = getRepository(User);

        const emailExists = await usersRepository.findOne({
            where: { email },
        });

        if (emailExists) {
            throw new Error('O email inserido já estã cadastrado!');
        }

        const user = usersRepository.create({
            name,
            email,
            password,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateAppointmentService;
