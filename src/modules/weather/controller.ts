import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentDto } from './dto/current-dto';
import { WeatherService } from './service';
import { TResponseWeather } from './types';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
    constructor(
        private readonly service: WeatherService
    ) {}

    @ApiOperation({ summary: 'Получение текущей погоды' })
    @UseGuards(AuthGuard)
    @Post()
    current(@Body() dto: CurrentDto): Promise<TResponseWeather> {
        return this.service.current(dto);
    }

    @ApiOperation({ summary: 'Получение текущей погоды' })
    @UseGuards(AuthGuard)
    @Get()
    some(): string {
        return 'yes';
    }

    @ApiOperation({ summary: 'Не получение текущей погоды' })
    @UseGuards(AuthGuard)
    @Post('error')
    currentError(@Body() dto: CurrentDto): Promise<TResponseWeather> {
        return this.service.current(dto, false);
    }
}
