import { UserModel } from '@prisma/client';
import { UsersLoginDto } from './dto/users-login.dto.js';
import { UsersRegisterDto } from './dto/users-register.dto.js';
import { HTTPError } from '../errors/http-error.class.js';

export interface IUsersService {
	createUser: (dto: UsersRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UsersLoginDto) => Promise<UserModel | HTTPError>;
}
