/// <reference types="cookie-parser" />
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
export declare class UserService {
    create(createUserDto: CreateUserDto): string;
    findAll(request: Request): import("./entities/user.entity").User;
    findOne(id: number): string;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
