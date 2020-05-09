import { Field, ObjectType } from '@nestjs/graphql';
import { TeamMemberType } from './team-member.type';

@ObjectType('Team')
export class TeamType {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field(returns => TeamMemberType)
    owner: string;

    @Field(returns => [TeamMemberType])
    members: string[];

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;
}
