import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './user.type';
import { CreateUserInput } from './user.input';
import { UserLoginInput } from './user-login.input';
import { AccessTokenType } from './access-token.type';

@Resolver('User')
export class UserResolver {
    constructor(private readonly userService: UserService) {}
    @Mutation(type => UserType)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.userService.createUser(createUserInput);
    }

    @Query(type => AccessTokenType)
    login(@Args('userLoginInput') userLoginInput: UserLoginInput) {
        return this.userService.loginUser(userLoginInput);
    }
}
