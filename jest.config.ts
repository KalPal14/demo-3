// импортировать только ts тип
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	verbose: true, // что бы видеть детальный аутпут
	preset: 'ts-jest',
};

export default config;
