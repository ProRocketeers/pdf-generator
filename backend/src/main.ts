import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Logger, ValidationPipe } from '@nestjs/common'
import { AppModule } from '@backend/app.module'
import { configureSwagger } from '@backend/configs/swagger.config'
import { GlobalExceptionFilter } from '@backend/filters/global-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const port = Number(process.env.PORT || 4000)
  const logger = new Logger('Bootstrap')

  app.enableCors()

  app.useGlobalFilters(new GlobalExceptionFilter())

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  configureSwagger(app)

  app.use((req, res, next) => {
    if (req.method === 'GET' && req.path === '/') {
      res.redirect('/swagger')
      return
    }

    next()
  })

  await app.listen(port)

  const localUrl = new URL(await app.getUrl())
  logger.log(`Application is running on: http://localhost:${localUrl.port}`)
}
bootstrap()
