import { forwardRef, Module } from '@nestjs/common';
import { NotaService } from './nota.service';
import { NotaController } from './nota.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './nota.entity';
import { UserModule } from 'src/user/user.module';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nota]),
    UserModule,
    TagsModule,
  ],
  providers: [NotaService],
  controllers: [NotaController],
  exports: [NotaService],
})
export class NotaModule { }
