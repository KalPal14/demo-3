import { injectable } from 'inversify';

import { UsersLoginDto } from './dto/users-login.dto.js';
import { UsersRegisterDto } from './dto/users-register.dto.js';
import { User } from './user.entity.js';
import { IUsersService } from './users.service.interfase.js';

@injectable()
export class UsersService implements IUsersService {
	public async createUser({ email, name, password }: UsersRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		// есть такой пользователь?
		// да - return null
		// нет - return User
		return null;
	}

	public async validateUser(dto: UsersLoginDto): Promise<boolean> {
		return true;
	}
}
