/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface ResquestDTO {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFileName,
  }: ResquestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new AppError(
        'O usuário logado não tem permissões para alterar a foto de perfil',
        401,
      );
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
