import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { WeatherController } from '../controller';
import { WeatherService } from '../service';
import { AuthGuard } from '../../../modules/auth/auth.guard';
import { UserService } from '../../../modules/user/service';
import { AuthService } from '../../../modules/auth/service';

describe('WeatherController', () => {
    let module: TestingModule;
    let app: INestApplication;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            controllers: [WeatherController],
            providers: [
                {
                    provide: WeatherService,
                    useValue: jest.fn()
                }, {
                    provide: AuthGuard,
                    useValue: jest.fn()
                }, {
                    provide: UserService,
                    useValue: jest.fn()
                }, {
                    provide: AuthService,
                    useValue: jest.fn()
                }
            ],
            imports: []
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await Promise.all([
            app.close(),
        ]);
    });

    it('/weather/error (POST)', () => {
        return request(app.getHttpServer())
            .post('/weather/error')
            .expect(403);
    });
});
