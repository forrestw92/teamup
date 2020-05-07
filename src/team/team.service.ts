import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { Repository } from 'typeorm';
import { CreateTeamInput } from './team.input';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ) {}
    async createTeam(createTeamInput: CreateTeamInput): Promise<Team> {
        const { name } = createTeamInput;
        const nowISO = new Date().toISOString();
        const team = await this.teamRepository.create({
            id: uuid(),
            name,
            createdAt: nowISO,
            updatedAt: nowISO,
        });
        return this.teamRepository.save(team);
    }

    async getAllTeams(): Promise<Team[]> {
        return this.teamRepository.find();
    }
    async getTeamById(teamId: string): Promise<Team> {
        return this.teamRepository.findOne({ id: teamId });
    }
}
