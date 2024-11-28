import { Tags } from "src/tags/tags.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Nota {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string

    @Column()
    desc: string

    @Column()
    data: Date

    @Column({ default: null })
    dataExclude?: Date

    @Column({ default: true })
    isActive: boolean
    
    @ManyToMany(() => User, (user) => user.notas)
    users: User[];

    @ManyToMany(() => Tags, (tags) => tags.notas, {eager: true})
    @JoinTable()
    tags: Tags[];

}
