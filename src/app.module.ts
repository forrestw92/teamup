import { Module } from '@nestjs/common';
import { TeamModule } from './team/team.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team/team.entity';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: 'mongodb://localhost/teamup',
            useUnifiedTopology: true,
            synchronize: true,
            entities: [Team],
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        TeamModule,
    ],
})
export class AppModule {}
