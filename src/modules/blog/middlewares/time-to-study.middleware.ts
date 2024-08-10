import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class TimeToStudyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void {
        if (req.method.toLowerCase() === 'post') {
            console.log('in if')
            req.body.timeToStudy = Number(req.body.timeToStudy);

        }
        next() 
    }
}