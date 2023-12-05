import { inject, injectable } from 'inversify';

import { UsersLoginDto } from './dto/users-login.dto';
import { UsersRegisterDto } from './dto/users-register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interfase';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';
import { HTTPError } from '../errors/http-error.class';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}

	public async createUser({ email, name, password }: UsersRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));

		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		return await this.usersRepository.create(newUser);
	}

	public async validateUser({ email, password }: UsersLoginDto): Promise<UserModel | HTTPError> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return new HTTPError(404, 'Пользователя с таким email не существует', 'UsersService');
		}

		const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
		const isPassValid = await newUser.comparePassword(password);

		if (isPassValid) {
			return existedUser;
		}
		return new HTTPError(401, 'не верный пароль', 'UsersService');
	}

	public async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	}
}
