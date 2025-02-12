import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from '../db/db.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    DbModule,
    MongooseModule.forFeature([{ 
        name: User.name,  // User.name is just "User". 'User.name' is a fancy way to get the class name.
        schema: UserSchema 
      } // Register the schema
    ]), 
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService
  ],
})
export class UserModule {}
