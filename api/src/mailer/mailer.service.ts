import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mykyxxxx@gmail.com',
                pass: 'udnd akin liom wbhv',
            },
        });
    }

    async sendVerificationEmail(email: string, token:string): Promise<void> {

        if(!token)
            throw new Error("O campo de token está vazio ou inválido!");

        const verificationUrl = `http://localhost:3001/emailVerificado/${token}`;
        
        if(!email || email.trim() === ""){
            throw new Error('O campo "email" está vazio ou inválido!');
        }


        const mailOptions = {
            from: '"NoReply" <noreply@gmail.com>',
            to: email,
            subject: 'Verifique seu E-mail',
            html: `<p>Por favor, confirme seu e-mail clicando no link: </p><a href="${verificationUrl}">${verificationUrl}</a>`,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
