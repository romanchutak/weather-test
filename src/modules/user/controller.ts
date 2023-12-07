
import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly service: UserService
    ) {}

    @ApiOperation({ summary: 'Авторизация' })
    @Put(':id')
    login(@Param('id') id: string, @Body() dto: any): Promise<any> {
        return this.service.update(+id, dto);
    }
}
