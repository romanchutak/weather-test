import { registerAs } from '@nestjs/config';

export default registerAs<TWeatherConfig>('weather', () => {
    return {
        apiKey: process.env.WEATGER_API_TOKEN,
        url: process.env.WEATHER_API_URL
    };
});

export type TWeatherConfig = {
    apiKey: string;
    url: string;
};
