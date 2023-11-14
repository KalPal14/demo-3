import express, { Express } from "express";
import { Server } from "http";

import { userRouter } from "./users/users.js";

export class App {
  public app: Express;
  public servet: Server;
  public port: number;

  constructor() {
    this.app = express();
    this.port = 8000;
  }

  public useRoutes() {
    this.app.use("/users", userRouter);
  }

  public init() {
    this.useRoutes();
    this.app.listen(this.port);
    console.log(`Сервер запущен http://localhost:${this.port}`);
  }
}
