import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { TagsService } from './tags.service';
import { EditTagsDTO, TagsDTO } from './DTO/tags.dto';

@Controller('tags')
export class TagsController {
    constructor(
        private readonly tagsService: TagsService
    ) {}

    @Get()
    async puxarTagsByUser(@Request() req : Request){
        const user = await req['user'];
        return await this.tagsService.findAllTagsByUser(user)
    }

    @Post("criar")
    async criarTag(@Body() tagDto: TagsDTO, @Request() req: Request){
        const user = req['user'];
        return this.tagsService.adicionarTag(tagDto, user)
    }

    @Put('editar/:id')
    async editarTag(@Body() editTagDto: EditTagsDTO, @Param('id') id: number){
        return this.tagsService.editTag(editTagDto, id)
    }

    @Delete('deletar/:id')
    async deletarTag(@Param('id') id: number){
        return this.tagsService.deleteTag(id)
    }

}
