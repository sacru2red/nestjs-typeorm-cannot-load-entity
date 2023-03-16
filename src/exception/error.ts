import { HttpException } from '@nestjs/common'
import { Request } from 'express'

const ERROR_PREFIX = 'Validation failed '

const PARSE_ARRAY_PIPE_VALIDATION_ERROR_MESSAGE = '(parsable array expected)'
const PARSE_BOOL_PIPE_VALIDATION_ERROR_MESSAGE = '(boolean string is expected)'
const PARSE_ENUM_PIPE_VALIDATION_ERROR_MESSAGE = '(enum string is expected)'
const PARSE_NUMERIC_PIPE_VALIDATION_ERROR_MESSAGE = '(numeric string is expected)'

// ParseArrayPipe @nestjs/common/pipes/parse-array.pipe.js
const _PARSE_ARRAY_PIPE_VALIDATION_ERROR_MESSAGE = ERROR_PREFIX + PARSE_ARRAY_PIPE_VALIDATION_ERROR_MESSAGE
// ParseBoolPipe @nestjs/common/pipes/parse-bool.pipe
const _PARSE_BOOL_PIPE_VALIDATION_ERROR_MESSAGE = ERROR_PREFIX + PARSE_BOOL_PIPE_VALIDATION_ERROR_MESSAGE
// ParseEnumPipe @nestjs/common/pipes/parse-enum.pipe.js
const _PARSE_ENUM_PIPE_VALIDATION_ERROR_MESSAGE = ERROR_PREFIX + PARSE_ENUM_PIPE_VALIDATION_ERROR_MESSAGE
// ParseFloatPipe @nestjs/common/pipes/parse-float.pipe.js
const _PARSE_FLOAT_PIPE_VALIDATION_ERROR_MESSAGE = ERROR_PREFIX + PARSE_NUMERIC_PIPE_VALIDATION_ERROR_MESSAGE
// ParseIntPipe @nestjs/common/pipes/parse-int.pipe
const _PARSE_INT_PIPE_VALIDATION_ERROR_MESSAGE = ERROR_PREFIX + PARSE_NUMERIC_PIPE_VALIDATION_ERROR_MESSAGE
// ParseUUIDPipe @nestjs/common/pipes/parse-uuid.pipe.js
const _PARSE_UUID_PIPE_VALIDATION_ERROR_MESSAGE = ERROR_PREFIX + '(uuid{versionstirng} is expected)'
// versionstring = '' || ' v${version}'
// version = [3, 4, 5, all]

function replacePrefixToKo (prev: string): string {
  const regEx = new RegExp('^' + ERROR_PREFIX)
  return prev.replace(regEx, '타입 불일치, ')
}

export class MessageReplaceKoError extends HttpException {
  constructor (prevMessage: string | Record<string, any>, status: number) {
    if (typeof prevMessage === 'string') {
      const newMessage = replacePrefixToKo(prevMessage)
        .replace(PARSE_ARRAY_PIPE_VALIDATION_ERROR_MESSAGE, '목록으로 입력되어야 하는 값이 잘못 입력되었습니다.')
        .replace(PARSE_BOOL_PIPE_VALIDATION_ERROR_MESSAGE, '참/거짓으로 입력되어야 하는 값이 잘못 입력되었습니다.')
        .replace(PARSE_ENUM_PIPE_VALIDATION_ERROR_MESSAGE, '열거형으로 입력되어야 하는 값이 잘못 입력되었습니다.')
        .replace(PARSE_NUMERIC_PIPE_VALIDATION_ERROR_MESSAGE, '숫자값으로 입력되어야 하는 값이 잘못 입력되었습니다.')
        .replace(/\(uuid (v3 |v4 |v5 |all ){0,1}is expected\)/, '')
      super(newMessage, status)
    } else {
      super(prevMessage, status)
    }
  }
}

export const GlobalResponseError: (statusCode: number, message: string, code: string, request: Request) => IResponseError = (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
): IResponseError => {
  return {
    statusCode,
    message,
    code,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method,
  }
}

export interface IResponseError {
  statusCode: number
  message: string
  code: string
  timestamp: string
  path: string
  method: string
}
