import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
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
    UserModule,
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
      useClass: AuthGuard,  // Aplica o guard globalmente
    },
  ],
  exports: [AuthService, PasswordService],
})
export class AuthModule {}
