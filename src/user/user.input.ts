import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';
import { Match } from '../decorators/match.decorator';

@InputType()
export class CreateUserInput {
    @Field()
    @MinLength(1)
    @MaxLength(100)
    firstName: string;

    @Field()
    @MinLength(1)
    @MaxLength(100)
    lastName: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(2)
    @MaxLength(25)
    username: string;

    @Field()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password to weak',
    })
    password: string;

    @Field()
    @MinLength(8)
    @MaxLength(50)
    @Match('password', { message: 'Passwords must match' })
    confirmPassword: string;
}
