import { LoginDto } from './dto/login-dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/service';
import { RegistrationDto } from './dto/registration-dto';
import { ServiceErrorHandle } from '../../common/decorators/service.error.handle';

import * as bcrypt from 'bcryptjs';
import { LoginReturnDto } from './dto/login-return-dto';

import { v4 } from 'uuid';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
    private currentUser;

    constructor(
        private readonly userService: UserService,
    ) {}

    public getUser(): User {
        return this.currentUser;
    }

    public setUser(user: User) {
        this.currentUser = user;
    }

    async login(dto: LoginDto): Promise<LoginReturnDto> {
        const user = await this.userService.findByLogin(dto.login);

        if (user === null) {
            throw new UnauthorizedException();
        }

        const equalPass = await bcrypt.compare(dto.password, user.password);

        if (equalPass) {
            const updated = await this.userService.update(user.id, { apiToken: v4() });

            return {
                fio: user.fio,
                apiToken: updated.apiToken
            };
        }

        throw new UnauthorizedException();
    }

    @ServiceErrorHandle()
    async registration(data: RegistrationDto): Promise<LoginReturnDto> {
        const user = await this.userService.create(data);

        return {
            fio: user.fio,
            apiToken: user.apiToken
        };
    }
}
