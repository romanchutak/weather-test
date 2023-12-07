import { Observable } from 'rxjs';
import { UserService } from '../user/service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const req: Request = context.switchToHttp().getRequest();

        if (req.body['apiToken'] === undefined) {
            return false;
        }

        try {
            return this.userService.findByToken(req.body['apiToken'])
                .then(user => {
                    if (user) {
                        this.authService.setUser(user);
                        return true;
                    }

                    return false;
                },
                () => {
                    return false;
                });
        } catch (e) {
            throw new UnauthorizedException(e);
        }
    }
}
