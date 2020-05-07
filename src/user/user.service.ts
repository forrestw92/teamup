import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateUserInput } from './user.input';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const {
            password,
            confirmPassword,
            email,
            firstName,
            lastName,
            username,
        } = createUserInput;
        const nowISO = new Date().toISOString();
        if (password !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }
        const user = await this.userRepository.create({
            id: uuid(),
            password,
            email,
            firstName,
            lastName,
            username,
            createdAt: nowISO,
            updatedAt: nowISO,
        });
        return this.userRepository.save(user);
    }
    async getUserById(userId: string) {
        return this.userRepository.findOne({ id: userId });
    }
}
