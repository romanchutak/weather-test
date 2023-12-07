import { Module } from '@nestjs/common';

import { User } from './user.entity';
import { UserService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UserService],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
