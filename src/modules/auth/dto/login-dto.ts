import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'Ivan', description: 'Login' })
    @Allow()
    @IsNotEmpty()
    readonly login: string;

    @ApiProperty({ example: '12345!', description: 'Пароль' })
    @Allow()
    @MinLength(6)
    @IsNotEmpty()
    @Matches(RegExp(/(?:(\.|,|!|_).*)/), { message: 'Пароль должен содержать хотя бы один из символов ,.!_' })
    readonly password: string;
}
