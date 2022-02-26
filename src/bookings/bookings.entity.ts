import { User } from "src/auth/user.entity";
import { Timesheet } from "src/timesheet/timesheet.entity";
import { Vacancies } from "src/vacancies/vacancies.entity";
import { Column, Entity, JoinColumn, CreateDateColumn, ManyToOne, UpdateDateColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";

export enum BookingStatus {
    PROPOSED = "PROPOSED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    APPROVED = "APPROVED"
}

@Entity()
export class Bookings {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne((_type) => Vacancies, vacancy => vacancy.booking, { eager: true })
    @JoinColumn()
    vacancy: Vacancies;

    @ManyToOne((_type) => User, candidate => candidate.bookings, { eager: true })
    @JoinColumn()
    candidate: User;

    @Column({
        type: "enum",
        enum: BookingStatus,
        default: BookingStatus.PROPOSED
    })
    status: BookingStatus;

    @OneToMany((_type) => Timesheet, timesheet => timesheet.bookings, {eager:false})
    timesheet: Timesheet;

    @CreateDateColumn({type: "timestamptz"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamptz"})
    updatedAt: Date;
}