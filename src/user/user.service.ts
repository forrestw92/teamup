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
import { JwtPayload } from './jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,

        private readonly jwtService: JwtService,
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
        return this.createAccessToken(user);
    }
    async createAccessToken(user: User): Promise<{ accessToken: string }> {
        const { username } = user;
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
    async getUserById(userId: string) {
        return this.userRepository.findOne({ id: userId });
    }
}
