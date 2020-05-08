import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: 3600,
            },
        }),
    ],
    providers: [AuthService, JwtAuthGuard],
    exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
