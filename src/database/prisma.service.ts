import { PrismaClient } from '@prisma/client';
import { injectable, inject } from 'inversify';

import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	private _client: PrismaClient;

	constructor(@inject(TYPES.LoggerService) private logger: ILogger) {
		this._client = new PrismaClient();
	}

	get client(): PrismaClient {
		return this._client;
	}

	async connect(): Promise<void> {
		try {
			await this._client.$connect();
			this.logger.log('[PrismaService] подключение к БД прошло успешно');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[PrismaService] ошибка подключения к БД');
			}
		}
	}

	async disconnect(): Promise<void> {
		this._client.$disconnect();
	}
}
