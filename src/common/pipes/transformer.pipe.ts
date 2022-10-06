import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class TransformerPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.data === 'name') {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
