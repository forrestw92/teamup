import { Field, ID, InputType } from '@nestjs/graphql';
import { type } from 'os';
import { IsUUID } from 'class-validator';

@InputType()
export class JoinTeamInput {
    @Field(type => ID)
    @IsUUID('4')
    teamId: string;
}
