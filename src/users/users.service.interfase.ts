import { UserModel } from '@prisma/client';
import { UsersLoginDto } from './dto/users-login.dto.js';
import { UsersRegisterDto } from './dto/users-register.dto.js';

export interface IUsersService {
	createUser: (dto: UsersRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UsersLoginDto) => Promise<boolean>;
}
