import { NextFunction, Request, Response, Router } from 'express';

export interface IRouterController {
	path: string;
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
	func: (req: Request, res: Response, next: NextFunction) => void;
}
