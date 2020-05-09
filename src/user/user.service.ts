import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { UserRepository } from './user.repository';
import { UserLoginInput } from './user-login.input';
import { JwtPayload } from '../auth/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,

        private readonly authService: AuthService,
    ) {}

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        return this.userRepository.createUser(createUserInput);
    }

    async loginUser(
        userLoginInput: UserLoginInput,
    ): Promise<{ accessToken: string }> {
        const user: User = await this.userRepository.validatePassword(
            userLoginInput,
        );
        if (!user || !user.username) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.createAccessToken(user);
    }

    async getUserById(userId: string) {
        return this.userRepository.findOne({ id: userId });
    }

    async getMany(userIds: string[]): Promise<User[]> {
        return this.userRepository.find({
            where: {
                id: {
                    $in: userIds,
                },
            },
        });
    }
}
