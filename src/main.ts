import { App } from "./app.js";
import { LoggerService } from "./logger/logger.service.js";
import { UsersController } from "./users/users.controller.js";

const bootstrap = async () => {
  const logger = new LoggerService();
  const app = new App(logger, new UsersController(logger));
  app.init();
};

bootstrap();
