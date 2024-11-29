import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/auth/public.Dec';
import { UserDTO } from './DTO/user.dto';

@Controller('user')
export class UserController {
    constructor(
        public readonly userService : UserService,
    ) {}

}
