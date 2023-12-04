import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IUsersController } from './users.controller.interfase';
import { UsersLoginDto } from './dto/users-login.dto';
import { UsersRegisterDto } from './dto/users-register.dto';
import { IUsersService } from './users.service.interfase';
import { ValidateMiddleware } from '../common/validate.middleware';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.LoggerService) private loggerServise: ILogger,
		@inject(TYPES.UsersService) private usersServise: IUsersService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerServise);
		this.bindRoutes([
			{
				method: 'post',
				path: '/login',
				func: this.login,
				middlewares: [new ValidateMiddleware(UsersLoginDto)],
			},
			{
				method: 'post',
				path: '/register',
				func: this.register,
				middlewares: [new ValidateMiddleware(UsersRegisterDto)],
			},
		]);
	}

	async login(
		{ body }: Request<{}, {}, UsersLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.usersServise.validateUser(body);

		if (result instanceof HTTPError) {
			return next(result);
		}

		const jwt = await this.signJWT(body.email, this.configService.get('SECRET'));
		this.ok(res, { id: result.id, jwt });
	}

	async register(
		{ body }: Request<{}, {}, UsersRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.usersServise.createUser(body);

		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует', 'register'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}

	private async signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			jsonwebtoken.sign(
				{
					email,
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err.message);
					}
					resolve(token as string);
				},
			);
		});
	}
}
