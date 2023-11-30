import { IsEmail, IsString } from 'class-validator';

export class UsersLoginDto {
	@IsEmail({}, { message: 'Введите валидный email' })
	public email: string;

	@IsString({ message: 'Поле пароля обязательно' })
	public password: string;
}
