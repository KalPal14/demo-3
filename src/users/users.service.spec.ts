import 'reflect-metadata';
import { Container } from 'inversify';

import { UsersService } from './users.service';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { IUsersService } from './users.service.interfase';
import { TYPES } from '../types';
import { UserModel } from '@prisma/client';
import { User } from './user.entity';

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
});
