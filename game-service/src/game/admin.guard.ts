import { Injectable, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException('You must be logged in to access this feature.');
    }

    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Access denied. Only ADMIN can perform this action.');
    }
    return user;
  }
}