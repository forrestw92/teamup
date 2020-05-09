import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';
import { CreateTeamInput } from './team.input';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.entity';
import { JoinTeamInput } from './join-team.input';
import { DeleteTeamType } from './delete-team.type';
@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ) {}
    async createTeam(createTeamInput: CreateTeamInput, user): Promise<Team> {
        const { name } = createTeamInput;
        const nowISO = new Date().toISOString();
        const hasOwnedTeam = await this.getTeamByOwnerId(user.id);
        if (hasOwnedTeam) {
            throw new BadRequestException('Can only own one team.');
        }
        const team = await this.teamRepository.create({
            id: uuid(),
            name,
            owner: user.id,
            createdAt: nowISO,
            updatedAt: nowISO,
            members: [],
        });
        return this.teamRepository.save(team);
    }

    async joinTeam(joinTeamInput: JoinTeamInput, user: User): Promise<Team> {
        const { teamId } = joinTeamInput;
        const team = await this.getTeamById(teamId);
        const isOwner = team.owner === user.id;
        const isMember = team.members.indexOf(user.id) > -1;
        if (isMember) {
            throw new BadRequestException('Already active team member.');
        }
        if (isOwner) {
            throw new BadRequestException('Not allowed to join own team.');
        }
        team.members = [...team.members, user.id];
        return this.teamRepository.save(team);
    }
    async deleteTeam(teamId: string, user: User): Promise<DeleteTeamType> {
        const team = await this.getTeamById(teamId);
        const isOwner = team.owner === user.id;

        if (!isOwner) {
            throw new UnauthorizedException();
        }

        const result = await this.teamRepository.remove(team);

        if (!result) {
            throw new BadRequestException(
                `Error deleting team with id ${teamId}`,
            );
        }
        return { teamId };
    }
    async getAllTeams(): Promise<Team[]> {
        return this.teamRepository.find();
    }
    async getTeamById(teamId: string): Promise<Team> {
        const team = await this.teamRepository.findOne({ id: teamId });
        if (!team) {
            throw new BadRequestException('Team id is not valid');
        }
        return team;
    }

    async getTeamByOwnerId(ownerId: string): Promise<Team> {
        return this.teamRepository.findOne({
            owner: ownerId,
        });
    }
}
