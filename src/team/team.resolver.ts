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
import { TeamMemberType } from './team-member.type';
import { JoinTeamInput } from './join-team.input';
import { DeleteTeamType } from './delete-team.type';

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

    @Mutation(type => TeamType)
    joinTeam(
        @Args('joinTeamInput') joinTeamInput: JoinTeamInput,
        @GetUser() user: User,
    ) {
        return this.teamService.joinTeam(joinTeamInput, user);
    }

    @Mutation(type => DeleteTeamType)
    deleteTeam(@Args('teamId') teamId: string, @GetUser() user: User) {
        return this.teamService.deleteTeam(teamId, user);
    }

    @Mutation(type => TeamType)
    removeMember(@Args('memberId') memberId: string, @GetUser() user: User) {
        return this.teamService.removeMember(memberId, user);
    }

    @Mutation(type => TeamType)
    leaveTeam(@GetUser() user: User) {
        return this.teamService.leaveTeam(user);
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
    async members(@Parent() team: Team): Promise<TeamMemberType[]> {
        const users = await this.userService.getMany(team.members);
        if (users.length > 0) {
            return users.map(
                ({ firstName, username, lastName }): TeamMemberType => {
                    return { firstName, lastName, username };
                },
            );
        }
        return [];
    }
    @ResolveField()
    async owner(@Parent() team: Team): Promise<TeamMemberType> {
        const {
            firstName,
            lastName,
            username,
        } = await this.userService.getUserById(team.owner);
        return { firstName, lastName, username };
    }
}
