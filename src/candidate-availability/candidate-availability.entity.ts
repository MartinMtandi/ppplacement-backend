import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CandidateAvailability {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    candidateId: string;

    @Column()
    shiftDate: Date;

    @Column('boolean', {default: false})
    early: boolean = false;

    @Column('boolean', {default: false})
    long: boolean = false;

    @Column('boolean', {default: false})
    late: boolean = false;

    @Column('boolean', {default: false})
    sleepIn: boolean = false;

    @Column('boolean', {default: false})
    night: boolean = false;

    @Column('boolean', {default: false})
    unAvailable: boolean = false;

    @CreateDateColumn({type: "timestamptz"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamptz"})
    updatedAt: Date;
}