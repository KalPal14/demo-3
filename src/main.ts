import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';

import { App } from './app.js';
import { ExeptionFilter } from './errors/exeption.filter.js';
import { LoggerService } from './logger/logger.service.js';
import { UsersController } from './users/users.controller.js';

import { ILogger } from './logger/logger.interface.js';
import { IExeptionFilter } from './errors/exeption.filter.interface.js';
import { TYPES } from './types.js';
import { IUsersController } from './users/users.controller.interfase.js';

interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.App).to(App);
	bind<ILogger>(TYPES.LoggerService).to(LoggerService);
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUsersController>(TYPES.UsersController).to(UsersController);
});

const bootstrap = (): IBootstrapReturn => {
	const appContainer = new Container();
	appContainer.load(appBindings);

	const app = appContainer.get<App>(TYPES.App);
	app.init();

	return { appContainer, app };
};

export const { appContainer, app } = bootstrap();
