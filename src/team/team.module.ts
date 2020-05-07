import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Team])],
    providers: [TeamService, TeamResolver],
})
export class TeamModule {}
