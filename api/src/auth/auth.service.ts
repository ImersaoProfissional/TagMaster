    import { Injectable, UnauthorizedException } from '@nestjs/common';
    import { JwtService } from '@nestjs/jwt';
    import { UserService } from 'src/user/user.service';
    import { PasswordService } from './password/password.service';

    @Injectable()
    export class AuthService {
        constructor(
            private jwtService: JwtService,
            private userService: UserService,
            private passwordService: PasswordService,
        ) { }

        async singIn(emailPassado: string, password: string): Promise<{ access_token: string }> {
            const user = await this.userService.findUserBy({ email: emailPassado });

            if (!user) {
                throw new UnauthorizedException('Email ou senha incorretos');
            }

            if (
                !(this.passwordService.comparePass(password, user.password))
            ) {
                throw new UnauthorizedException('Email ou senha incorretos');
            }

            const { id: sub, email } = user;
            console.log("ID/SUB: ",sub, "IMEI", email) // excluir

            return {
                access_token: await this.jwtService.signAsync({ sub, email }),
            };
        }


        //Envio e confirmação de email

        async generateEmailVerifyToken(email: string): Promise<string> {
            const user = await this.userService.findUserBy({ email: email });

            if (!user)
                throw new UnauthorizedException("Usuario não foi encontrado, por isso não podemos enviar o email");

            const payload = { email: user.email };

            return await this.jwtService.signAsync(payload, { expiresIn: '1h' });
        }

        async verifyEmailToken(token: string): Promise<boolean> {
            try {
                const decoded = await this.jwtService.verifyAsync(token);
                console.log("Olha o email que veio: ", decoded.email);
                const user = await this.userService.findUserBy({email: decoded.email});
                if(!user) {
                    throw new UnauthorizedException('Token invalido!');
                }

                user.isEmailActive = true;
                await this.userService.update(user.id, { user : user });
                return true;
            } catch {
                throw new UnauthorizedException("Token invalido ou expirado")
            }
        }
    }
