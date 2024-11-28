import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotaModule } from './nota/nota.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { TagsModule } from './tags/tags.module';
import { ActivityMiddleware } from './auth.middleware';  // Middleware de atividade
import { User } from './user/user.entity';
import { Nota } from './nota/nota.entity';
import { Tags } from './tags/tags.entity';

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
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('Middleware sendo EXECUTADO!!!');
    consumer
      .apply(ActivityMiddleware)  // Aplica o middleware de atividade
      .exclude('/auth/*')          // Exclui as rotas de autenticação, já protegidas pelo AuthGuard
      .forRoutes('*');             // Aplica o middleware para todas as outras rotas
  }
}
