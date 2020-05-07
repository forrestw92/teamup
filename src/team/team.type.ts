import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Team')
export class TeamType {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;
}
