import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ExcludeNullInterceptor } from './utils/excludeNull.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalInterceptors(new ExcludeNullInterceptor())
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }))
  app.use(cookieParser())
  await app.listen(3000)
}
bootstrap()
