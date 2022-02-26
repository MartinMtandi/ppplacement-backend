import { User } from "src/auth/user.entity";
import { Bookings } from "src/bookings/bookings.entity";
import { BusinessUnit } from "src/business-unit/business-unit.entity";
import { Client } from "src/client/client.entity";
import { InternalUser } from "src/internal-users/internal-users.entity";
import { Speciality } from "src/specialities/speciality.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum VacancyStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED"
}

export enum ShiftType {
    EARLY = "EARLY",
    LONG_DAY = "LONG_DAY",
    SLEEP_IN = "SLEEP_IN",
    NIGHT = "NIGHT",
    LATE_SHIFT = "LATE_SHIFT"
}

@Entity()
export class Vacancies {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    bookingStartDate: Date;

    @Column()
    bookingEndDate: Date;

    @Column()
    positionsAvailable: number;

    @Column({default: 0})
    positionsFilled: number;

    @Column({default: 0})
    interestedCandidates: number;

    @ManyToOne((_type) => Client, client => client.vacancy, { eager: true })
    @JoinColumn()
    client: Client;

    @ManyToOne((_type) => BusinessUnit, businessUnit => businessUnit.vacancy, { eager: true })
    @JoinColumn()
    businessUnit: BusinessUnit;

    @ManyToOne((_type) => Speciality, speciality => speciality.vacancy, { eager: true })
    @JoinColumn()
    speciality: Speciality;

    @ManyToOne((_type) => InternalUser, createdBy => createdBy.vacancy, { eager: true })
    @JoinColumn()
    createdBy: InternalUser;

    @OneToMany((_type) => Bookings, booking => booking.vacancy, { eager: false })
    booking: Bookings[];

    @ManyToMany((_type) => User, candidate => candidate.vacancy, { eager: false })
    candidate: User[];

    @Column({
        type: "enum",
        enum: VacancyStatus,
        default: VacancyStatus.OPEN
    })
    status: VacancyStatus;

    @CreateDateColumn({type: "timestamptz"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamptz"})
    updatedAt: Date;
}