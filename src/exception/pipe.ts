import {
  ParseArrayPipe as DefaultParseArrayPipe,
  ParseBoolPipe as DefaultParseBoolPipe,
  ParseEnumPipe as DefaultParseEnumPipe,
  ParseFloatPipe as DefaultParseFloatPipe,
  ParseIntPipe as DefaultParseIntPipe,
  ParseUUIDPipe as DefaultParseUUIDPipe,
} from '@nestjs/common'
import { MessageReplaceKoError } from './error'

export class ParseArrayPipe extends DefaultParseArrayPipe {
  constructor (props: any) {
    Object.defineProperty(props, 'exceptionFactory', {
      value: (error: string) => {
        return new MessageReplaceKoError(error, 400)
      },
    })
    super(props)
  }
}

export class ParseBoolPipe extends DefaultParseBoolPipe {
  constructor (props: any) {
    Object.defineProperty(props, 'exceptionFactory', {
      value: (error: string) => {
        return new MessageReplaceKoError(error, 400)
      },
    })
    super(props)
  }
}

export class ParseIntPipe extends DefaultParseIntPipe {
  constructor (props: any = {}) {
    Object.defineProperty(props, 'exceptionFactory', {
      value: (error: string) => {
        return new MessageReplaceKoError(error, 400)
      },
    })
    super(props)
  }
}

export class ParseEnumPipe extends DefaultParseEnumPipe {
  constructor (props: any) {
    Object.defineProperty(props, 'exceptionFactory', {
      value: (error: string) => {
        return new MessageReplaceKoError(error, 400)
      },
    })
    super(props)
  }
}

export class ParseFloatPipe extends DefaultParseFloatPipe {
  constructor (props: any) {
    Object.defineProperty(props, 'exceptionFactory', {
      value: (error: string) => {
        return new MessageReplaceKoError(error, 400)
      },
    })
    super(props)
  }
}

export class ParseUUIDPipe extends DefaultParseUUIDPipe {
  constructor (props: any) {
    Object.defineProperty(props, 'exceptionFactory', {
      value: (error: string) => {
        return new MessageReplaceKoError(error, 400)
      },
    })
    super(props)
  }
}
