// tags.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tags } from './tags.entity';
import { NotaModule } from 'src/nota/nota.module';  // Importação correta do NotaModule
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tags]),
    forwardRef(() => NotaModule),  // Usando forwardRef() para evitar dependência circular
    UserModule,
  ],
  providers: [TagsService],
  controllers: [TagsController],
  exports: [TagsService],
})
export class TagsModule {}
