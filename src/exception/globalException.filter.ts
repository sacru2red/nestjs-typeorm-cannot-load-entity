import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Request, Response } from 'express'
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError } from 'typeorm'
import { TypeGuardError } from 'typia'
import { GlobalResponseError } from './error'

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  catch (exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    let message = (exception).message?.message as string ?? (exception).response?.message as string
    let code = 'HttpException'

    Logger.error('globalException.filter', message, (exception).stack, `${request.method} ${request.url}`)

    let status = HttpStatus.INTERNAL_SERVER_ERROR

    switch (exception.constructor) {
    case HttpException:
      status = (exception as HttpException).getStatus()
      break
    case QueryFailedError: // this is a TypeOrm error
      status = HttpStatus.UNPROCESSABLE_ENTITY
      message = (exception as QueryFailedError).message
      if (message.includes('Duplicate entry')) {
        message = '중복된 값이 있어 입력할 수 없습니다.'
      }
      code = 'QueryFailedError'
      break
    case EntityNotFoundError: // this is another TypeOrm error
      status = HttpStatus.UNPROCESSABLE_ENTITY
      code = 'EntityNotFoundError'
      message = '조건에 맞는 결과를 찾을 수 없습니다.'
      break
    case CannotCreateEntityIdMapError: // and another
      status = HttpStatus.UNPROCESSABLE_ENTITY
      message = (exception as CannotCreateEntityIdMapError).message
      code = 'CannotCreateEntityIdMapError'
      break
    case TypeGuardError:
      status = HttpStatus.BAD_REQUEST
      message = (exception as TypeGuardError).message
      code = 'TypeGuardError'
      break
    default:
      console.log('status', status, 'message', message, 'code', code)
      return super.catch(exception, host)
    }
    console.log('status', status, 'message', message, 'code', code)

    response.status(status).json(GlobalResponseError(status, message, code, request))
  }
}
