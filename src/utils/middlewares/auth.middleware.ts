import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ReqInterface } from '../interfaces/request.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: ReqInterface, res: Response, next: NextFunction) {
    const token =
      req.cookies.access_token || req.headers['authorization']?.split(' ')[1];
      
      if (!token) {
        throw new HttpException('Token not provided', HttpStatus.UNAUTHORIZED);
      }
  
      try {
        const decoded = verify(token, process.env.JWT_SECRET) as { id: number, email: string };
        // Attach the decoded user id to the request object
        req.user = decoded.id;
        next();
      } catch (error) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
  }
}