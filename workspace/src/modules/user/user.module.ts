import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from '../db/db.module';

@Module({
  providers: [
    UserService
  ],
  imports: [
    DbModule
  ],
  controllers: [UserController]
})
export class UserModule {}
