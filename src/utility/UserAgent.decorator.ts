import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { getAgent } from './agent'

export const UserAgent = createParamDecorator(
  (data: string, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest()
    return getAgent(request)
  },
)
