import dotenv, { DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';

import { IConfigService } from './config.service.interface.js';
import { TYPES } from '../types.js';
import { ILogger } from '../logger/logger.interface.js';

@injectable()
export class ConfigService implements IConfigService {
	private env: DotenvParseOutput;

	constructor(@inject(TYPES.LoggerService) private loggerService: ILogger) {
		const result: DotenvConfigOutput = dotenv.config();
		if (result.error || !result.parsed) {
			this.loggerService.error(
				'[ConfigService] Не удалось распарсить .env. Возможно .env файл отсутствует или пустой',
			);
		} else {
			this.loggerService.log('[ConfigService] .env файл успешно распарсен');
			this.env = result.parsed;
		}
	}

	get(key: string): string {
		return this.env[key];
	}
}
