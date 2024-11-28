import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { join } from 'path';

@Module({
    imports: [
        NestMailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                    user: 'mykyxxxx@gmail.com',
                    pass: 'udnd akin liom wbhv',
                }
            },
            defaults: {
                from: '"No Reply" <no-reply@example.com>',
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailerService],
    exports: [MailerService]
})
export class MailerModule { }
