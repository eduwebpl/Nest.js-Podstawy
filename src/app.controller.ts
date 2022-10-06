import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AppGuard } from './common/guards/app.guard';
import { Admin } from './common/decorators/admin.decorator';
import { CustomException } from './common/exceptions/custom.exception';
import { HttpFilter } from './common/filters/http.filter';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello !';
  }

  @Get('/user')
  getSample(@Query('name') name: string) {
    throw new CustomException();
    return { name };
  }

  @Post()
  createFruit(@Body() fruit: { name: string }) {
    return { fruit };
  }

  @Put()
  updateFruit(@Body() fruit: { name: string }) {
    return fruit;
  }

  @Delete(':fruitId')
  deleteFruit(@Param('fruitId') fruitId: string) {
    return { fruitId };
  }
}
