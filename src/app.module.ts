import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UserModule } from './modules/user/module';
import { AuthModule } from './modules/auth/module';
import databaseConfig from './database/config/database.config';
import weatherConfig from './config/weather';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { WeatherModule } from './modules/weather/module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig, weatherConfig],
            envFilePath: ['.env'],
        }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            dataSourceFactory: async (options: DataSourceOptions) => {
                return new DataSource(options).initialize();
            },
        }),
        UserModule,
        AuthModule,
        WeatherModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
