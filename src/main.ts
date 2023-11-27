import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';

import { App } from './app.js';
import { ExeptionFilter } from './errors/exeption.filter.js';
import { LoggerService } from './logger/logger.service.js';
import { UsersController } from './users/users.controller.js';
import { UsersService } from './users/users.service.js';
import { ConfigService } from './config/config.service.js';

import { TYPES } from './types.js';
import { ILogger } from './logger/logger.interface.js';
import { IExeptionFilter } from './errors/exeption.filter.interface.js';
import { IUsersController } from './users/users.controller.interfase.js';
import { IUsersService } from './users/users.service.interfase.js';
import { IConfigService } from './config/config.service.interface.js';

interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.App).to(App);
	bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUsersController>(TYPES.UsersController).to(UsersController);
	bind<IUsersService>(TYPES.UsersService).to(UsersService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
});

const bootstrap = (): IBootstrapReturn => {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(TYPES.App);
	app.init();

	return { appContainer, app };
};

export const { appContainer, app } = bootstrap();
