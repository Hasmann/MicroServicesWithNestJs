import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const getUserParam = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
