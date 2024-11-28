import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from 'src/auth/public.Dec';
import { UserDTO } from './DTO/user.dto';

@Controller('user')
export class UserController {
    constructor(
        public readonly userService : UserService,
    ) {}

    @Public()
    @Post('cadastro')
    async cadastro(@Body() userDto: UserDTO){
        if(!userDto)
            throw new Error("Usuário não foi passado corretamente")
        
        if(userDto.confirmPassword != null){
            if(userDto.password !== userDto.confirmPassword){
                throw new UnauthorizedException("A senha de confirmação não corresponde a senha normal")
            }
        }
        console.log("Usuario vai ser passado!");
        return await this.userService.createUser(userDto);
        
    }
}
