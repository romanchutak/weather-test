import { ApiProperty } from '@nestjs/swagger';
import { Allow, Matches, MinLength } from 'class-validator';
import {
    IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'Ivan', description: 'Login' })
    @Allow()
    @IsNotEmpty()
    readonly login: string;

    @ApiProperty({ example: '12345!', description: 'Пароль' })
    @Allow()
    @IsNotEmpty()
    @MinLength(6)
    @Matches(RegExp(/(?:(\.|,|!|_).*)/), { message: 'Пароль должен содержать хотя бы один из символов ,.!_' })
    readonly password: string;

    @ApiProperty({ example: 'Ivanov Ivan Ivanovich', description: 'FIO' })
    @Allow()
    @IsNotEmpty()
    readonly fio: string;
}
