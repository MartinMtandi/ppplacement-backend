import { Bookings } from "src/bookings/bookings.entity";
import { Invoice } from "src/invoice/invoice.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Timesheet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    bookingDate: Date;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column()
    breakTime: string;

    @Column()
    totalHoursWorked: string;

    @Column({nullable: true})
    comment: string;

    @Column()
    authorizedPerson: string;

    @Column()
    authorizedPersonSignature: string;

    @Column()
    candidateSignature: string;

    @ManyToOne((_type) => Bookings, bookings => bookings.timesheet, { eager: true })
    @JoinColumn()
    bookings: Bookings;

    @OneToOne((_type) => Invoice, invoice => invoice.timesheet, {eager: false})
    invoice: Invoice;

    @CreateDateColumn({type: "timestamptz"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamptz"})
    updatedAt: Date;
}