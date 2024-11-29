import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.Dec';
import { SingInDto } from './DTO/auth.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { UserDTO } from 'src/user/DTO/user.dto';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('auth')
export class AuthController {
    constructor(
        public readonly authService: AuthService,
        public readonly mailService: MailerService,
        public readonly userService: UserService,
    ) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async singIn(@Body() singInDto: SingInDto) {
        return await this.authService.singIn(singInDto.email, singInDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
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

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("temp")
    async userTemporary() {
        const publicUser = {
            id: uuidv4(),
            email: '',
            nome: "Public User",
            temp: true
        }
        
        const user = await this.userService.createTempUser(publicUser);

        await this.authService.singIn(user.email, user.password)
        
        return 

    }
    


    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('enviar/email')
    async verifyEmail(@Body() { email }: { email: string }) {
        const token = await this.authService.generateEmailVerifyToken(email);
        await this.mailService.sendVerificationEmail(email, token);
        return { message: "Verificação de e-mail enviada!" };
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('verificar/email/:token')
    async verifyEmailToken(@Param('token') token: string) {
        const result = await this.authService.verifyEmailToken(token);

        if (result) {
            return { message: 'E-mail verificado com sucesso!' };
        } else {
            return { message: 'Falha na verificação de e-mail' };
        }

    }

    @Get('profile')
    async profile(@Request() req: Request) {
        return await req['user'];
    }
}
