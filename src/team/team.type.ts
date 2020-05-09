import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.entity';
import { UserType } from '../user/user.type';
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
