import { Field, ID, ObjectType } from '@nestjs/graphql';
import { TeamType } from './team.type';

@ObjectType('DeleteTeam')
export class DeleteTeamType {
    @Field()
    teamId: string;
}
