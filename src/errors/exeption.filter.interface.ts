import { NextFunction, Request, Response } from "express";

import { LoggerService } from "../logger/logger.service.js";

export interface IExeptionFilter {
  logger: LoggerService;

  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
