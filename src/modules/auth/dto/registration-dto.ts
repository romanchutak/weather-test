import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty } from 'class-validator';
import { LoginDto } from './login-dto';

export class RegistrationDto extends LoginDto {
    @ApiProperty({ example: 'Ivanov Ivan Ivanovich', description: 'FIO' })
    @Allow()
    @IsNotEmpty()
    readonly fio: string;
}
