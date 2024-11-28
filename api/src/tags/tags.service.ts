import { forwardRef, Inject, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tags } from './tags.entity';
import { NotaService } from 'src/nota/nota.service';
import { EditTagsDTO, TagsDTO } from './DTO/tags.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tags) private tagRepository: Repository<Tags>,
        @Inject(forwardRef(() => NotaService)) private notaService: NotaService,
        private readonly userService: UserService,
    ) { }


    async adicionarTag(tagDto: TagsDTO, user: User) {
        if (!tagDto || !user)
            throw new NotAcceptableException("Não foi passado os elementos para criação");

        const tagCriada = this.tagRepository.create(
            {
                titulo: tagDto.titulo,
                cor: tagDto.cor,
                user: user,
            });

        return await this.tagRepository.save(tagCriada);

    }

    async editTag(tagDtoEdit: EditTagsDTO, id: number) {
        if (!tagDtoEdit)
            throw new NotAcceptableException("Não foi passado os elementos para edição");

        let tagToEdit = await this.findtagBy({ id: id });

        tagToEdit = {
            ...tagToEdit,
            ...(tagDtoEdit && { titulo: tagDtoEdit.titulo }),
            ...(tagDtoEdit && { cor: tagDtoEdit.cor }),
        };

        return this.tagRepository.save(tagToEdit);
        
    }

    async deleteTag(id: number){
        const tag = await this.findtagBy({ id: id });
        return this.tagRepository.delete(tag);
    }


    async findtagBy(tagFind: { titulo?: string, id: number }): Promise<Tags> {
        const { titulo, id } = tagFind

        if (!titulo && !id)
            throw new UnauthorizedException("titulo não foi passado");

        const tag = titulo ? await this.tagRepository.findOneBy({ titulo: titulo })
            : id ? await this.tagRepository.findOneBy({ id: id })
                : null;


        if (!tag)
            throw new NotFoundException("Tag não foi encontrado");

        return tag;

    }

    async findAllTagsByUser(user: User){
        const userComTags = await this.userService.puxarTags(user);
        if(!userComTags)
            throw new NotFoundException("Não foi achado nenhum usuario com as tags")

        return userComTags.tags;
    }

    async findAllTagsById(ids: number[]) {
        const tags = await this.tagRepository.find({
            where: { id: In(ids) },
        });

        if (!tags)
            throw new Error("Nenhuma tag com esse id foi encontrada");

        return tags;
    }

}
