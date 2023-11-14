import express, { Express, Router } from "express";
import { Server } from "http";

import { UsersController } from "./users/users.controller.js";
import { LoggerService } from "./logger/logger.service.js";

export class App {
  public app: Express;
  public servet: Server;
  public port: number;
  public logger: LoggerService;
  public usersController: UsersController;

  constructor(logger: LoggerService, usersController: UsersController) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
  }

  public useRoutes() {
    this.app.use("/users", this.usersController.router);
  }

  public init() {
    this.useRoutes();
    this.app.listen(this.port);
    this.logger.log([`Сервер запущен http://localhost:${this.port}`]);
  }
}
