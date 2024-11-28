import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotaModule } from './nota/nota.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

import { MailerModule } from './mailer/mailer.module';
import { User } from './user/user.entity';
import { Nota } from './nota/nota.entity';
import { TagsModule } from './tags/tags.module';
import { Tags } from './tags/tags.entity';
import { ActivityMiddleware } from './auth/auth.middleware';

@Module({
  imports: [TypeOrmModule.forRoot({
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
    AuthModule, 
    MailerModule, 
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ActivityMiddleware).forRoutes('*'); // Todas as rotas
  }
}
