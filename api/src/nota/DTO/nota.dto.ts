import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NotaDTO {
    @IsNotEmpty()
    @IsString()
    titulo: string

    @IsNotEmpty()
    @IsString()
    desc: string

    data?: Date;
    @IsNumber()
    tags?: number[]
}

export class EditNotaDTO {
    titulo?: string

    desc?: string

    data?: Date;

    tags?: number[]
}