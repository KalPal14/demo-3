import { App } from "./app.js";
import { ExeptionFilter } from "./errors/exeption.filter.js";
import { LoggerService } from "./logger/logger.service.js";
import { UsersController } from "./users/users.controller.js";

const bootstrap = async () => {
  const logger = new LoggerService();
  const app = new App(
    logger,
    new UsersController(logger),
    new ExeptionFilter(logger)
  );
  app.init();
};

bootstrap();
