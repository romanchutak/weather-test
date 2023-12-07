import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { UserModule } from '../user/module';
import { AuthController } from './controller';

@Module({
    imports: [UserModule],
    exports: [AuthService],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
