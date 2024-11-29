import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotaModule } from './nota/nota.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { TagsModule } from './tags/tags.module';
import { User } from './user/user.entity';
import { Nota } from './nota/nota.entity';
import { Tags } from './tags/tags.entity';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD,  } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'userAdminTag',
      password: 'userPassTag',
      database: 'tagMaster',
      entities: [User, Nota, Tags],
      synchronize: true,
    }),
    NotaModule,
    UserModule,
    AuthModule,  // AuthModule com o guard
    MailerModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // Aplica o AuthGuard globalmente
    },
  ],
})
export class AppModule{
}
