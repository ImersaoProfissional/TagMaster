import { IsNotEmpty, IsString, Length } from "class-validator";

export class TagsDTO {
    @IsNotEmpty()
    titulo: string;

    @IsNotEmpty()
    @Length(7, 7, { message: 'A cor deve estar em formato exadecimal: #FFFFFF' })
    cor: string;
}

export class EditTagsDTO {

    titulo?: string;

    @Length(7, 7, { message: 'A cor deve estar em formato exadecimal: #FFFFFF' })
    cor?: string;
}