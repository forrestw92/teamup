import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateUserInput } from './user.input';
import * as bcrypt from 'bcrypt';

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
        if (password !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        const salt = await bcrypt.genSalt();
        const nowISO = new Date().toISOString();
        const hashedPassword = await this.hashPassword(password, salt);

        const user = await this.userRepository.create({
            id: uuid(),
            password: hashedPassword,
            email,
            firstName,
            lastName,
            username,
            salt,
            createdAt: nowISO,
            updatedAt: nowISO,
        });
        return this.userRepository.save(user);
    }
    async getUserById(userId: string) {
        return this.userRepository.findOne({ id: userId });
    }

    private async hashPassword(
        password: string,
        salt: string,
    ): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}
