import { Module } from '@nestjs/common';

import { Weather } from './weather.entity';
import { WeatherService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherController } from './controller';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/module';
import { UserModule } from '../user/module';

@Module({
    imports: [TypeOrmModule.forFeature([Weather]), HttpModule, AuthModule, UserModule],
    exports: [WeatherService],
    providers: [WeatherService],
    controllers: [WeatherController],
})
export class WeatherModule {}
