import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from './user.input';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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

        const user = await this.create({
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
        return this.save(user);
    }
    private async hashPassword(
        password: string,
        salt: string,
    ): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
}
