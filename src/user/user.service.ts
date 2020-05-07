import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) {}

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        return this.userRepository.createUser(createUserInput);
    }
    async getUserById(userId: string) {
        return this.userRepository.findOne({ id: userId });
    }
}
