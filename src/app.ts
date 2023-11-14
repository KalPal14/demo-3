import express, { Express } from "express";
import { Server } from "http";

import { userRouter } from "./users/users.js";
import { LoggerService } from "./logger/logger.service.js";

export class App {
  public app: Express;
  public servet: Server;
  public port: number;
  public logger: LoggerService;

  constructor(logger: LoggerService) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
  }

  public useRoutes() {
    this.app.use("/users", userRouter);
  }

  public init() {
    this.useRoutes();
    this.app.listen(this.port);
    this.logger.log([`Сервер запущен http://localhost:${this.port}`]);
  }
}
