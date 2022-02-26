import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CandidateRate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne((_type) => User, candidate => candidate.rate, { eager: false })
    @JoinColumn()
    candidate: User;

    @Column()
    weekday: string;

    @Column()
    weeknight: string;

    @Column()
    saturdayday: string;

    @Column()
    saturdaynight: string;

    @Column()
    sundayday: string;

    @Column()
    sundaynight: string;

    @Column()
    sleep_in: string;

    @Column()
    bankholidayday: string;

    @Column()
    bankholidaynight: string;

}