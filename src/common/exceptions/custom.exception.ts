import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message = 'Custom exception') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
