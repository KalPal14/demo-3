import { inject, injectable } from 'inversify';

import { UsersLoginDto } from './dto/users-login.dto.js';
import { UsersRegisterDto } from './dto/users-register.dto.js';
import { User } from './user.entity.js';
import { IUsersService } from './users.service.interfase.js';
import { IConfigService } from '../config/config.service.interface.js';
import { TYPES } from '../types.js';
import { IUsersRepository } from './users.repository.interface.js';
import { UserModel } from '@prisma/client';

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

	public async validateUser(dto: UsersLoginDto): Promise<boolean> {
		return true;
	}
}
