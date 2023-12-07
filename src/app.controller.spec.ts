import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';


describe('AppController', () => {
    let module: TestingModule;
    let app: INestApplication;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        app = module.createNestApplication();
    });

    afterEach(async () => {
        await Promise.all([
            app.close(),
        ]);
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});
