import { inject, injectable } from 'inversify';

import { UsersLoginDto } from './dto/users-login.dto.js';
import { UsersRegisterDto } from './dto/users-register.dto.js';
import { User } from './user.entity.js';
import { IUsersService } from './users.service.interfase.js';
import { IConfigService } from '../config/config.service.interface.js';
import { TYPES } from '../types.js';

@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

	public async createUser({ email, name, password }: UsersRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		console.log(salt);
		await newUser.setPassword(password, Number(salt));
		// есть такой пользователь?
		// да - return null
		// нет - return User
		return null;
	}

	public async validateUser(dto: UsersLoginDto): Promise<boolean> {
		return true;
	}
}
