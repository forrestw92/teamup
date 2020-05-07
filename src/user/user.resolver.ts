import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './user.type';
import { CreateUserInput } from './user.input';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) {}
    @Mutation(type => UserType)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.createUser(createUserInput);
    }
}
