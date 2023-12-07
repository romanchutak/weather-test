import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Allow, IsNotEmpty } from 'class-validator';

export class CurrentDto {
    @ApiProperty({ example: 'qwe-qwe-qwe-qwe', description: 'Token' })
    @Allow()
    @IsNotEmpty()
    readonly apiToken: string;

    @ApiProperty({ example: 'Tyumen', description: 'City' })
    @Allow()
    @IsNotEmpty()
    readonly city: string;

    @ApiPropertyOptional({ example: 'ru', description: 'Lang' })
    @Allow()
    readonly language?: string;
}
