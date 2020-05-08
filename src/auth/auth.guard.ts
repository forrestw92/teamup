import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
//https://github.com/nestjs/graphql/issues/48#issuecomment-567963946
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: AuthService) {}

    canActivate(context: ExecutionContext) {
        const authHeader = GqlExecutionContext.create(context)
            .getContext()
            .req.header('Authorization');
        if (!authHeader) {
            throw new BadRequestException('Authorization header not found.');
        }
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer') {
            throw new BadRequestException(
                `Authentication type \'Bearer\' required. Found \'${type}\'`,
            );
        }
        const validationResult = this.jwtService.validateAccessToken(token);
        if (validationResult === true) {
            return true;
        }
        throw new UnauthorizedException(validationResult);
    }
}
