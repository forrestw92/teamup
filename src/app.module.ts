import { Module } from '@nestjs/common';
import { TeamModule } from './team/team.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team/team.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: 'mongodb://localhost/teamup',
            useUnifiedTopology: true,
            synchronize: true,
            entities: [Team, User],
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        TeamModule,
        UserModule,
        AuthModule,
    ],
})
export class AppModule {}
