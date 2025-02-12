import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {
  }

  create(dto: CreateUserDto) {
    const createdUser = new this.userModel(dto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  update(id: string, dto: UpdateUserDto) {
    const updatedUser = this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;

  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
