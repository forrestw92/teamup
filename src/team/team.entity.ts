import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('Team')
export class Team {
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    owner: string;

    @Column()
    members: string[];

    @Column()
    createdAt: string;

    @Column()
    updatedAt: string;
}
