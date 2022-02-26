import { Timesheet } from "src/timesheet/timesheet.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    hoursWorked: string;

    @Column()
    billRate: string;

    @Column()
    payRate: string;

    @Column()
    grossIncome: string;

    @Column()
    grossPay: string;

    @Column()
    grossProfit: string;

    @Column()
    grossProfitMargin: string;

    @Column()
    transportDeduction: string;

    @Column()
    training: string;

    @Column()
    additionAmount: string;

    @Column()
    reasonForAmount: string;

    @OneToOne((_type) => Timesheet, timesheet => timesheet.invoice, {eager: true})
    @JoinColumn()
    timesheet: Timesheet;

    @CreateDateColumn({type: "timestamptz"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamptz"})
    updatedAt: Date;
}