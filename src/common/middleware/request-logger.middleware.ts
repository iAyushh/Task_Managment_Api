import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";
import { start } from "repl";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        const { method, originalUrl, ip} = req;
        const userAgent = req.get('user-agent')|| '';
        const startTime = Date.now();
        console.log(`[REQUEST] ${method} ${originalUrl} - ${ip} - ${userAgent} `);

        res.on('finish',()=>{
            const {statusCode} = res;
            const duration = Date.now()-startTime;
            console.log(`[RESPONSE ${method} ${originalUrl} - ${statusCode} - ${duration} ms]`);
            

        });
        next();
    }
}