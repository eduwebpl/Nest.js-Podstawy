import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PostgresError } from 'pg-error-enum';
import { QueryFailedError, TypeORMError } from 'typeorm';

interface ExceptionResponse {
  statusCode: number;
  message: string[];
  error: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let message = 'Unknown error' as string | string[];
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof TypeORMError) {
      message = 'Database Error';
      statusCode = HttpStatus.BAD_REQUEST;
      if (exception instanceof QueryFailedError) {
        if (exception.driverError?.code === PostgresError.UNIQUE_VIOLATION) {
          message = 'Duplicate entry';
        }
      }
    } else if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse?.() as ExceptionResponse;
      message = exceptionResponse.message;
      statusCode = exceptionResponse.statusCode;
    } else if (exception instanceof HttpException) {
      message = exception.message;
      statusCode = exception.getStatus();
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    ctx.getResponse().status(statusCode).json({
      statusCode,
      message,
    });
  }
}
