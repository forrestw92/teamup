import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class JoinTeamInput {
    @Field(type => ID)
    @IsUUID('4')
    teamId: string;
}
