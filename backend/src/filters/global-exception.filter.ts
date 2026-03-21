import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('GlobalException')

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'
    let details: any = null

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      message =
        typeof exceptionResponse === 'object'
          ? (exceptionResponse as any).message || exception.message
          : exceptionResponse

      // Log s kontextem
      this.logger.error(
        `${request.method} ${request.url} - Status: ${status} - Message: ${message}`,
        (exception as any).stack,
      )
    } else if (exception instanceof Error) {
      message = exception.message
      details = exception.stack

      this.logger.error(
        `Uncaught Exception - ${exception.message}`,
        exception.stack,
      )
    } else {
      this.logger.error('Unknown exception:', JSON.stringify(exception))
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      // V produkci se stack neposílá klientovi
      ...(process.env.NODE_ENV !== 'production' && { details }),
    })
  }
}
