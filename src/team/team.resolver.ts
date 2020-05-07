import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TeamService } from './team.service';
import { TeamType } from './team.type';
import { CreateTeamInput } from './team.input';

@Resolver('Team')
export class TeamResolver {
    constructor(private readonly teamService: TeamService) {}

    @Mutation(type => TeamType)
    createTeam(@Args('createTeamInput') createTeamInput: CreateTeamInput) {
        return this.teamService.createTeam(createTeamInput);
    }

    @Query(type => TeamType)
    team(@Args('teamId') teamId: string) {
        return this.teamService.getTeamById(teamId);
    }

    @Query(type => [TeamType])
    teams() {
        return this.teamService.getAllTeams();
    }
}
