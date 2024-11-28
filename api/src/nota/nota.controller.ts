import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { NotaService } from './nota.service';
import { EditNotaDTO, NotaDTO } from './DTO/nota.dto';

@Controller('nota')
export class NotaController {

    constructor(
        private notaService: NotaService
    ) { }

    @Post('criar')
    async criarNotaUser(@Body() notaDto: NotaDTO, @Request() req: Request) {
        const user = await req['user'];
        return this.notaService.createNota(notaDto, user);
    }

    @Put('editar/:id')
    async editarNota(@Body() editNotaDto: EditNotaDTO, @Param('id') id: number) {
        await this.notaService.editNota(editNotaDto, id)
    }

    @Delete('deletar/:id')
    async deletarNota(@Param('id') id: number) {
        return await this.notaService.deleteNota(id)
    }

    @Get()
    async todasNotasUser(@Request() req: Request) {
        const user = await req['user'];
        return this.notaService.allNotasByUser(user);

    }

    @Get('/:titulo')
    async notasPorTitulo(@Param('titulo') titulo: string) {
        return await this.notaService.findAllNotaBy({ titulo: titulo });
    }

    @Get('/:desc')
    async notasPorDescricao(@Param('desc') desc: string) {
        return await this.notaService.findAllNotaBy({ desc: desc });
    }


    @Get('excluidas')
    async todasNotasUserExcluidas(@Request() req: Request) {
        const user = await req['user'];
        return this.notaService.allNotasByUserDesativadas(user);

    }
}
