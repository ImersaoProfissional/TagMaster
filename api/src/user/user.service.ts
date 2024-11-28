import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO, UserDTOUpdate } from './DTO/user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>  // Injeção do UserRepository
    ) { }
    
    async createUser(user: UserDTO) {
    
        if (!user) {
            throw new UnauthorizedException("Usuario não foi passado corretamente");
        }
    
        console.log("Nome:", user.name, "Email:", user.email, "Password:", user.password, "Confirmação", user.confirmPassword);
    
    
        const response = this.userRepository.create(
            {
                name: user.name,
                email: user.email,
                password: user.password
            }
        );
        this.userRepository.save(response);
        console.log(response);
    
        console.log("Usuario cadastrado!")
        return "Usuario foi criado com sucesso!!";
    }
    
    
    async update(id: number, options: { user?: User; userDto?: UserDTOUpdate }) {
        const { user, userDto } = options;
    
        if (!user && !userDto)
            throw new UnauthorizedException("Informações não foram passadas corretamente!");
        
        const userToUp =
            userDto ? userDto // se userDto for passado ele recebe userDto
            : user ? user // se user for passado ele recebe user
            : null; // se não ele recebe nulo
    
        // puxa o usuário que será atualizado
        let currentUser = await this.findUserBy({ id: id });
        
        currentUser = {
            ...currentUser,
            ...(userToUp.email && { email: userToUp.email }),
            ...(userToUp.name && { name: userToUp.name }),
            ...(userToUp.password && { password: userToUp.password }),
            ...(userToUp.isEmailActive && { isEmailActive: userToUp.isEmailActive }),
        }
    
        await this.userRepository.save(currentUser);
    }

    
    async findUserBy(userFind: { id?: number; email?: string }): Promise<User> {
        const { id, email } = userFind;
        if (!email && !id)
            throw new UnauthorizedException("Email, ou Id não foram passados");
        
        const user =
        id ? await this.userRepository.findOneBy({ id: id }) // se o id for passado ele pesquisa por id 
        : email ? await this.userRepository.findOneBy({ email: email }) //se o email for passado ele pesquisa por email
            : null; // caso nenhum dos dois seja passado ele será nulo
            
            if (!user)
                throw new NotFoundException("Usuario não encontrado");

        return user;
    }

    async puxarNotas(user: User) {
        const userComNotas = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.notas', 'nota', 'nota.isActive = :isActive', {
          isActive: true,
        })
        .where('user.id = :id', { id: user.id })
        .getOne();

        return userComNotas;
    }

    async puxarTags(user: User) {
        const userComTags = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.tags', 'tags')
        .where('user.id = :id', { id: user.id })
        .getOne();

        return userComTags;
    }

    async puxarNotasDesativadas(user: User) {
        const userComNotas = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.notas', 'nota', 'nota.isActive = :isActive', {
          isActive: false,
        })
        .where('user.id = :id', { id: user.id })
        .getOne();


        return userComNotas;
    }


}
