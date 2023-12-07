import 'reflect-metadata';
import { Container } from 'inversify';

import { UsersService } from './users.service';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { IUsersService } from './users.service.interfase';
import { TYPES } from '../types';
import { UserModel } from '@prisma/client';
import { User } from './user.entity';
import { HTTPError } from '../errors/http-error.class';

const configServiceMock: IConfigService = {
	get: jest.fn(),
};

const usersRepositoryMock: IUsersRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUsersService;

beforeAll(() => {
	// toConstantValue
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(configServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(usersRepositoryMock);
	container.bind<IUsersService>(TYPES.UsersService).to(UsersService);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUsersService>(TYPES.UsersService);
});

describe('Users Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('10');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				email: user.email,
				name: user.name,
				password: user.password,
				id: 1,
			}),
		);

		const createdUser = await usersService.createUser({
			email: 'a@gmail.ru',
			name: 'Oleg',
			password: '1',
		});

		expect(createdUser?.email).toEqual('a@gmail.ru');
		expect(createdUser?.name).toEqual('Oleg');
		expect(createdUser?.password).toBeDefined();
		expect(createdUser?.password).not.toEqual('1');
		expect(createdUser?.id).toEqual(1);
	});

	it('[validateUser] non-existent email', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);

		const validationResult = await usersService.validateUser({
			email: 'a@gmail.com',
			password: '123123',
		});

		expect(validationResult).toBeInstanceOf(HTTPError);
		if (validationResult instanceof HTTPError) {
			expect(validationResult.statusCode).toEqual(404);
		}
	});

	it('[validateUser] wrong password', async () => {
		const passwordHash = '$2a$10$HJ0NesN36jFdmzqh/3wMQOW8n0Q835OgOsx9Rwtq5DnCUL0LhlVSy';
		usersRepository.find = jest.fn().mockReturnValueOnce({
			id: 1,
			email: 'a@gmail.com',
			name: 'Oleg',
			password: passwordHash,
		});

		const validationResult = await usersService.validateUser({
			email: 'a@gmail.com',
			password: 'wrong password',
		});

		expect(validationResult).toBeInstanceOf(HTTPError);
		if (validationResult instanceof HTTPError) {
			expect(validationResult.statusCode).toEqual(401);
		}
	});

	it('[validateUser] successful validation', async () => {
		const passwordHash = '$2a$10$HJ0NesN36jFdmzqh/3wMQOW8n0Q835OgOsx9Rwtq5DnCUL0LhlVSy';
		usersRepository.find = jest.fn().mockReturnValueOnce({
			id: 1,
			email: 'a@gmail.com',
			name: 'Oleg',
			password: passwordHash,
		});

		const validationResult = await usersService.validateUser({
			email: 'a@gmail.com',
			password: '1',
		});

		expect(validationResult).not.toBeInstanceOf(HTTPError);
		if (validationResult instanceof HTTPError) {
			return;
		}
		expect(validationResult.email).toEqual('a@gmail.com');
		expect(validationResult.name).toEqual('Oleg');
		expect(validationResult.password).toEqual(passwordHash);
		expect(validationResult.id).toEqual(1);
	});
});
