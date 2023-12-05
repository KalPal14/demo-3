import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { IMiddleware } from './middleware.interface';

export class JwtAuthMiddlewere implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			// в authorization будет лежать строка 'Bearer {jwt}'
			const jwtToken = req.headers.authorization.split(' ')[1];
			verify(jwtToken, this.secret, (err, payload) => {
				if (err || typeof payload === 'string' || typeof payload === 'undefined') {
					next();
				} else {
					req.user = payload.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
