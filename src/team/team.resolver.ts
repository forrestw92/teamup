import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { TeamService } from './team.service';
import { TeamType } from './team.type';
import { CreateTeamInput } from './team.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { GetUser } from '../user/get-user.decorator';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Team } from './team.entity';
import { TeamOwnerType } from './team-owner.type';

@Resolver(of => TeamType)
@UseGuards(JwtAuthGuard)
export class TeamResolver {
    constructor(
        private readonly teamService: TeamService,
        private readonly userService: UserService,
    ) {}

    @Mutation(type => TeamType)
    createTeam(
        @Args('createTeamInput') createTeamInput: CreateTeamInput,
        @GetUser() user: User,
    ) {
        return this.teamService.createTeam(createTeamInput, user);
    }

    @Query(type => TeamType)
    team(@Args('teamId') teamId: string) {
        return this.teamService.getTeamById(teamId);
    }

    @Query(type => [TeamType])
    teams() {
        return this.teamService.getAllTeams();
    }

    @ResolveField()
    async owner(@Parent() team: Team): Promise<TeamOwnerType> {
        const { firstName, lastName } = await this.userService.getUserById(
            team.owner,
        );
        return { firstName, lastName };
    }
}
