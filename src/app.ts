import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import express, { Express } from 'express';
import bodyParser from 'body-parser';

import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IUsersController } from './users/users.controller.interfase';
import { PrismaService } from './database/prisma.service';

@injectable()
export class App {
	public app: Express;
	public port: number;

	constructor(
		@inject(TYPES.LoggerService) private logger: ILogger,
		@inject(TYPES.UsersController) private usersController: IUsersController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	private useMiddleware(): void {
		this.app.use(bodyParser.json());
	}

	private useRoutes(): void {
		this.app.use('/users', this.usersController.router);
	}

	private useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilter();
		await this.prismaService.connect();
		this.app.listen(this.port);
		this.logger.log(`Сервер запущен http://localhost:${this.port}`);
	}
}
