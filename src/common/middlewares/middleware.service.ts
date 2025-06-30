import * as dotenv from 'dotenv';
dotenv.config({path : '../.env'});
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET!;

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, secretKey);
            req['user'] = decoded;
            console.log("Decoded Token is " , decoded);
            next()
        }
        catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
}