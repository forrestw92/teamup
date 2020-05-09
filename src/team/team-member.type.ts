import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('TeamMember')
export class TeamMemberType {
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    username: string;
}
