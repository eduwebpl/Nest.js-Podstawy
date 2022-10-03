import { Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from '../../auth/user/user.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: (error?: Error | any) => void) {
    const user = await this.userService.findOneBy({ id: 1 });
    console.log(user);
    next();
  }
}
