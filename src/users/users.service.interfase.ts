import { UserModel } from '@prisma/client';
import { UsersLoginDto } from './dto/users-login.dto';
import { UsersRegisterDto } from './dto/users-register.dto';
import { HTTPError } from '../errors/http-error.class';

export interface IUsersService {
	createUser: (dto: UsersRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UsersLoginDto) => Promise<UserModel | HTTPError>;
	getUserInfo: (email: string) => Promise<UserModel | null>;
}
