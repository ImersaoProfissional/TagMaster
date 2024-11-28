import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.Dec';
import { SingInDto } from './DTO/auth.dto';
import { MailerService } from 'src/mailer/mailer.service';

@Controller('auth')
export class AuthController {
    constructor(
        public readonly authService: AuthService,
        public readonly mailService: MailerService,
    ) { }

    @Public()
    @Post('login')
    async singIn(@Body() singInDto: SingInDto) {
        return await this.authService.singIn(singInDto.email, singInDto.password);
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
