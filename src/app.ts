import express, { Express, Router } from "express";

import { UsersController } from "./users/users.controller.js";
import { IExeptionFilter } from "./errors/exeption.filter.interface.js";
import { ILogger } from "./logger/logger.interface.js";

export class App {
  public app: Express;
  public port: number;
  public logger: ILogger;
  private usersController: UsersController;
  private exeptionFilter: IExeptionFilter;

  constructor(
    logger: ILogger,
    usersController: UsersController,
    exeptionFilter: IExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
    this.exeptionFilter = exeptionFilter;
  }

  private useRoutes() {
    this.app.use("/users", this.usersController.router);
  }

  private useExeptionFilter() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public init() {
    this.useRoutes();
    this.useExeptionFilter();
    this.app.listen(this.port);
    this.logger.log([`Сервер запущен http://localhost:${this.port}`]);
  }
}
