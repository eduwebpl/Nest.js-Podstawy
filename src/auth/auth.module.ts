import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [AuthService, UserService],
})
export class AuthModule {}
