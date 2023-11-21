import "reflect-metadata";
import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";

import { BaseController } from "../common/base.controller.js";
import { HTTPError } from "../errors/http-error.class.js";
import { TYPES } from "../types.js";
import { ILogger } from "../logger/logger.interface.js";

@injectable()
export class UsersController extends BaseController {
  constructor(@inject(TYPES.LoggerService) private loggerServise: ILogger) {
    super(loggerServise);
    this.bindRoutes([
      {
        method: "post",
        path: "/login",
        func: this.login,
      },
      {
        method: "post",
        path: "/register",
        func: this.register,
      },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, "ошибка авторизации", "login"));
    // this.ok(res, "login");
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
  }
}
