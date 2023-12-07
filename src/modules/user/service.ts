import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    create(dto: CreateUserDto): Promise<User> {
        return this.usersRepository.save(
            this.usersRepository.create(dto),
        );
    }

    update(id: User['id'], payload: DeepPartial<User>): Promise<User> {
        return this.usersRepository.save(
            this.usersRepository.create({
                id,
                ...payload,
            })
        );
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    findByToken(apiToken: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ apiToken });
    }

    findByLogin(login: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ login });
    }
}
