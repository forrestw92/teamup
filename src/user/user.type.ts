import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';
import { Match } from '../decorators/match.decorator';

@ObjectType()
export class CreateUserInput {
    @Field()
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;
}
