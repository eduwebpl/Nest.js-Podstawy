import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { QueryFailedError, TypeORMError } from 'typeorm';
import { ArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { PostgresError } from 'pg-error-enum';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Catch(TypeORMError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode = HttpStatus.BAD_REQUEST;
    let message = 'Database error';

    if (exception instanceof QueryFailedError) {
      if (exception.driverError?.code === PostgresError.UNIQUE_VIOLATION) {
        message = 'Duplicate entry';
        statusCode = HttpStatus.CONFLICT;
      }
    }

    if (this.configService.get('NODE_ENV') === 'development') {
      return response.status(statusCode).json({
        statusCode,
        stack: exception.stack,
        message: exception.message,
      });
    }

    return response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
