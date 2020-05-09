import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('TeamOwner')
export class TeamOwnerType {
    @Field()
    firstName: string;
    @Field()
    lastName: string;
}
