import { UsersLoginDto } from './dto/users-login.dto.js';
import { UsersRegisterDto } from './dto/users-register.dto.js';
import { User } from './user.entity.js';

export interface IUsersService {
	createUser: (dto: UsersRegisterDto) => Promise<User | null>;
	validateUser: (dto: UsersLoginDto) => Promise<boolean>;
}
