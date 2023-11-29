import { inject, injectable } from 'inversify';

import { UserModel } from '@prisma/client';

import { TYPES } from '../types.js';
import { PrismaService } from '../database/prisma.service.js';
import { IUsersRepository } from './users.repository.interface.js';
import { User } from './user.entity.js';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, name, password }: User): Promise<UserModel> {
		return await this.prismaService.client.userModel.create({
			data: {
				email,
				name,
				password,
			},
		});
	}

	async find(email: string): Promise<UserModel | null> {
		return await this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
