import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Assessment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('boolean', {default: false})
    diabetes: boolean = false;

    @Column('boolean', {default: false})
    ulcers: boolean = false;

    @Column('boolean', {default: false})
    circulatoryProblems: boolean = false;

    @Column('boolean', {default: false})
    chronicChest: boolean = false;

    @Column('boolean', {default: false})
    difficultyInSleeping: boolean = false;

    @Column('boolean', {default: false})
    medicalCondition: boolean = false;

    @Column('boolean', {default: false})
    mentalHealthProblem: boolean = false;

    @Column('boolean', {default: false})
    otherMedicalCondition: boolean = false;

    @Column('boolean', {default: false})
    nightShiftIllHealth: boolean = false;

    @Column('boolean', {default: false})
    isMother: boolean = false;

    @Column({nullable: true})
    comments: string;

    @OneToOne((_type) => User, user => user.assessment, { eager: false })
    @JoinColumn()
    @Exclude({ toPlainOnly: true })
    user: User
}