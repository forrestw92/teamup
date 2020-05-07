import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'ThisIsAStrongSecret',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    providers: [UserResolver, UserService],
})
export class UserModule {}
