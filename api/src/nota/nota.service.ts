import { BadRequestException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Nota } from './nota.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EditNotaDTO, NotaDTO } from './DTO/nota.dto';

import { TagsService } from 'src/tags/tags.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class NotaService {
    constructor(
        @InjectRepository(Nota) private notaRepository: Repository<Nota>,
        private userService: UserService,
        private tagsService: TagsService,
    ) { }

    async createNota(notaDto: NotaDTO, user: User) {
        if (!notaDto)
            throw new UnauthorizedException("Nota não foi passada corretamente")

        const dataNow = notaDto.data ? notaDto.data : new Date(Date.now())

        if (notaDto.tagId) {
            const tag = await this.tagsService.findAllTagsById(notaDto.tagId)

            const notaCriada = await this.notaRepository.create({
                titulo: notaDto.titulo,
                desc: notaDto.desc,
                data: dataNow,
                users: [user],
                tags: tag,
            });

            return this.notaRepository.save(notaCriada);
        }

        const notaCriada = await this.notaRepository.create({
            titulo: notaDto.titulo,
            desc: notaDto.desc,
            data: dataNow,
            users: [user],
        });
        return this.notaRepository.save(notaCriada);

    }
    
    async findAllNotaBy(notaFind: { titulo?: string; desc?: string}): Promise<Nota[]> {
        const { titulo, desc } = notaFind;
        if (!desc && !titulo)
            throw new UnauthorizedException("titulo ou descrição não foram passados");

        const nota =
            titulo ? await this.notaRepository.findBy({ titulo: titulo }) // se o titulo for passado ele pesquisa por titulo 
                : desc ? await this.notaRepository.findBy({ desc: desc })
                        : null; // caso nenhum dos dois seja passado ele será nulo

        if (!nota || nota === null)
            throw new NotFoundException("Nota não encontrada");

        return nota;
    }


    async findNotaBy(notaFind: { titulo?: string; desc?: string, id?: number }): Promise<Nota> {
        const { titulo, desc, id } = notaFind;
        if (!desc && !titulo && !id)
            throw new UnauthorizedException("titulo ou descrição não foram passados");

        const nota =
            titulo ? await this.notaRepository.findOneBy({ titulo: titulo }) // se o titulo for passado ele pesquisa por titulo 
                : desc ? await this.notaRepository.findOneBy({ desc: desc })
                    : id ? await this.notaRepository.findOneBy({ id: id }) //se o desc for passado ele pesquisa por desc
                        : null; // caso nenhum dos dois seja passado ele será nulo

        if (!nota || nota === null)
            throw new NotFoundException("Nota não encontrada");

        return nota;
    }

    async allNotasByUser(user: User) {

        const userComNotasSemTags = await this.userService.puxarNotas(user);

        const notasComTags = await this.notaRepository.find({
            where : { users: { id : userComNotasSemTags.id} },
        });

        if (!notasComTags)
            throw new NotFoundException("Nenhum id de notas está sendo achado")

        console.log("OLHA EU", notasComTags); // excluir
        return notasComTags;
    }

    async allNotasByUserDesativadas(user: User) {

        const userComNotas = await this.userService.puxarNotasDesativadas(user);
        if (!userComNotas)
            throw new NotFoundException("Nenhum id de notas está sendo achado")

        console.log("OLHA EU", userComNotas.notas); // excluir
        return userComNotas.notas;
    }

    async allTagsInNota(titulo: string) {
        const notaWithTags = await this.notaRepository.findOne({
            where: { titulo: titulo },
            relations: ['tags'], // Carrega a relação 'notas'
        });

        return notaWithTags.tags

    }

    async editNota(notaEditDto: EditNotaDTO, idNota: number) {
        if (!notaEditDto || !idNota)
            throw new NotAcceptableException("Nada foi passado para a atualização")
        let notaToEdit = await this.findNotaBy({ id: idNota });

        // Verfica quais que não estão nulas "&&" e passa o novo parametro caso não seja nulo
        notaToEdit = {
            ...notaToEdit,
            ...(notaEditDto.titulo && { titulo: notaEditDto.titulo }),
            ...(notaEditDto.desc && { desc: notaEditDto.desc }),
            ...(notaEditDto.data && { data: notaEditDto.data }),
            ...(notaEditDto.tagId && { tags: await this.tagsService.findAllTagsById(notaEditDto.tagId) }),
        };

        return this.notaRepository.save(notaToEdit);
    }

    async deleteNota(id: number) {
        const nota = await this.findNotaBy({ id: id })

        nota.isActive = false
        nota.dataExclude = new Date(Date.now());

        return this.notaRepository.save(nota);
    }

}
