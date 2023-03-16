import 'reflect-metadata'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { GlobalExceptionFilter } from './exception/globalException.filter'

async function bootstrap () {
  console.log('ENV', process.env.NODE_ENV)
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // app.use(Express.urlencoded({ extended: true }))
  app.enableCors({
    credentials: true,
    origin: /((https:\/\/(.*)\.bodumcare\.com)|(http:\/\/localhost))/,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH'],
  })
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }))
  // https://docs.nestjs.com/exception-filters#inheritance
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter))

  const port = Number(process.env.PORT ?? 5000)
  await app.listen(port)
}
void bootstrap()
