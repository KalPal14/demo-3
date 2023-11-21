import "reflect-metadata";
import { Container } from "inversify";

import { App } from "./app.js";
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { LoggerService } from "./logger/logger.service.js";
import { UsersController } from "./users/users.controller.js";

import { ILogger } from "./logger/logger.interface.js";
import { IExeptionFilter } from "./errors/exeption.filter.interface.js";
import { TYPES } from "./types.js";

export const appContainer = new Container();
appContainer.bind<App>(TYPES.App).to(App);
appContainer.bind<ILogger>(TYPES.LoggerService).to(LoggerService);
appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController);

export const app = appContainer.get<App>(TYPES.App);
app.init();
