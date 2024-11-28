import { Nota } from "src/nota/nota.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column({type: 'varchar', length: 7})
    cor: string;

    @ManyToMany(() => Nota, (nota) => nota.tags)
    notas: Nota[];

    @ManyToOne(() => User, (user) => user.tags)
    user : User

}