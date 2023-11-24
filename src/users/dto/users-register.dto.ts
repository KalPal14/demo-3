import { IsEmail, IsString } from 'class-validator';

export class UsersRegisterDto {
	@IsEmail({}, { message: 'Введите валидный email' })
	public email: string;

	@IsString({ message: 'Поле пароля обязательно' })
	public password: string;

	@IsString({ message: 'Поле имени обязательно' })
	public name: string;
}
