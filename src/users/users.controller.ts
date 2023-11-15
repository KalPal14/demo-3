import { Request, Response, NextFunction } from "express";

import { BaseController } from "../common/base.controller.js";
import { LoggerService } from "../logger/logger.service.js";
import { HTTPError } from "../errors/http-error.class.js";

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
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
