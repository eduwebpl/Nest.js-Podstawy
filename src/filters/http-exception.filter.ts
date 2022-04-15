import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { PostgresError } from 'pg-error-enum';
import { QueryFailedError } from 'typeorm';

interface ExceptionResponse {
  statusCode: number;
  message: string[];
  error: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    let status = exception.getStatus?.() || 500;
    let error = 'Internal Server Error';

    const exceptionResponse = exception.getResponse?.() as ExceptionResponse;

    if (exceptionResponse) {
      error = exceptionResponse.error;
      status = exceptionResponse.statusCode;
    }

    if (exception instanceof QueryFailedError) {
      if (exception.driverError?.code === PostgresError.UNIQUE_VIOLATION) {
        exception.message = 'Duplicate entry';
        status = 400;
      }
    }

    response.status(status).json({
      error: error || 'Internal Server Error',
      message: exceptionResponse
        ? exceptionResponse.message
        : exception.message,
    });
  }
}
