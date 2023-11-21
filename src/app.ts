import "reflect-metadata";
import { injectable, inject } from "inversify";
import express, { Express } from "express";

import { UsersController } from "./users/users.controller.js";
import { IExeptionFilter } from "./errors/exeption.filter.interface.js";
import { ILogger } from "./logger/logger.interface.js";
import { TYPES } from "./types.js";

@injectable()
export class App {
  public app: Express;
  public port: number;

  constructor(
    @inject(TYPES.LoggerService) private logger: ILogger,
    @inject(TYPES.UsersController) private usersController: UsersController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
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
