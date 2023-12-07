import { Weather } from './weather.entity';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { CurrentDto } from './dto/current-dto';
import { HttpService } from '@nestjs/axios';
import { TConfig } from '../../config/type';
import { lastValueFrom } from 'rxjs';
import { TResponseWeather } from './types';
import { TWeatherConfig } from '../../config/weather';
import { AuthService } from '../auth/service';

@Injectable()
export class WeatherService {
    constructor(
        @InjectRepository(Weather)
        private repository: Repository<Weather>,
        private configService: ConfigService<TConfig>,
        private httpService: HttpService,
        private authService: AuthService,
    ) {}

    async current(dto: CurrentDto, flag = true): Promise<any> {

        try {
            const response = await lastValueFrom(this.httpService.get<TResponseWeather>(
                this.configService.get<TWeatherConfig>('weather').url, {
                    params: {
                        ...dto,
                        q: dto.city,
                        lang: dto.language || 'ru',
                        key: flag ? this.configService.get<TWeatherConfig>('weather').apiKey : 'qwe'
                    }
                }
            ));

            await this.saveData({ status: response.status, data: response.data });

            return response.data;
        } catch (e) {
            await this.saveData({ status: e.response.status, data: null });
            throw new BadRequestException();
        }
    }

    async saveData(response: { status: number, data: TResponseWeather }): Promise<any> {
        return await this.repository.save(
            this.repository.create({
                userId: this.authService.getUser().id,
                requestResult: response.status,
                tempC: response.status == 200 ? Number(response.data.current.temp_c) : null
            })
        );
    }
}
