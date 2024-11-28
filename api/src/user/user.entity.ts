import { Nota } from 'src/nota/nota.entity'
import { Tags } from 'src/tags/tags.entity'
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isEmailActive: boolean

    @ManyToMany(() => Nota, (nota) => nota.users, { cascade: true })
    @JoinTable()
    notas: Nota[]

    @OneToMany(() => Tags, (tags) => tags.user)
    tags: Tags[]

}