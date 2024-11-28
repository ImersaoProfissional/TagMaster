import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
    public readonly saltOrRounds= 10;

    async hashPass(passText: string): Promise<string> {
       return await bcrypt.hash(passText, this.saltOrRounds);
    }

    async comparePass(password: string, hashedPassword: string): Promise<boolean>{
        return await bcrypt.compare(password, hashedPassword);
    }
}
