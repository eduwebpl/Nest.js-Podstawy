import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AppGuard } from './common/guards/app.guard';
import { Admin } from './common/decorators/admin.decorator';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello !';
  }

  @Get('/user')
  @Admin()
  @UseGuards(AppGuard)
  getSample(@Query('name') name: string) {
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
