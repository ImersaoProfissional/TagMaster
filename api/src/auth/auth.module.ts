import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';  // Certifique-se de importar o UserModule corretamente
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwtConstants';
import { UserService } from 'src/user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { PasswordService } from './password/password.service';
import { MailerService } from '../mailer/mailer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    UserModule,  // O UserModule deve ser importado para acessar o UserService e o UserRepository
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    MailerService,
    PasswordService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService, PasswordService],
})
export class AuthModule {}
