import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class UserDTO {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    confirmPassword?: string;

    isEmailActive?: boolean;

}

export class UserDTOUpdate {
    
    name?: string

    email?: string;

    password?: string;

    isEmailActive?: boolean;
}