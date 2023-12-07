import { DatabaseConfig } from '../database/config/database-config.type';
import { TWeatherConfig } from './weather';

export type TConfig = {
    database: DatabaseConfig,
    weather: TWeatherConfig
};
