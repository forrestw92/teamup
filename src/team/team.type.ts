import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../user/user.entity';
import { UserType } from '../user/user.type';
import { TeamOwnerType } from './team-owner.type';

@ObjectType('Team')
export class TeamType {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field(returns => TeamOwnerType)
    owner: string;

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;
}
