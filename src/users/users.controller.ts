import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { BaseController } from '../common/base.controller.js';
import { HTTPError } from '../errors/http-error.class.js';
import { TYPES } from '../types.js';
import { ILogger } from '../logger/logger.interface.js';
import { IUsersController } from './users.controller.interfase.js';
import { UsersLoginDto } from './dto/users-login.dto.js';
import { UsersRegisterDto } from './dto/users-register.dto.js';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.LoggerService) private loggerServise: ILogger) {
		super(loggerServise);
		this.bindRoutes([
			{
				method: 'post',
				path: '/login',
				func: this.login,
			},
			{
				method: 'post',
				path: '/register',
				func: this.register,
			},
		]);
	}

	login(req: Request<{}, {}, UsersLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HTTPError(401, 'ошибка авторизации', 'login'));
		// this.ok(res, "login");
	}

	register(req: Request<{}, {}, UsersRegisterDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		this.ok(res, 'register');
	}
}
