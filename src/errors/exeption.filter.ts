import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { NextFunction, Request, Response } from 'express';

import { IExeptionFilter } from './exeption.filter.interface.js';
import { HTTPError } from './http-error.class.js';
import { TYPES } from '../types.js';
import { ILogger } from '../logger/logger.interface.js';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.LoggerService) private logger: ILogger) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.logger.error([`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`]);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error([err.message]);
			res.status(500).send({ err: err.message });
		}
	}
}
