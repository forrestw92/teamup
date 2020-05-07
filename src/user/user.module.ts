import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'ThisIsAStrongSecret',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [UserResolver, UserService],
})
export class UserModule {}
