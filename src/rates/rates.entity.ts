import { BusinessUnit } from "src/business-unit/business-unit.entity";
import { Speciality } from "src/specialities/speciality.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rates {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne((_type) => Speciality, speciality => speciality.rates, { eager: true,  onDelete: 'CASCADE', })
    @JoinColumn()
    speciality: Speciality;

    @ManyToOne((_type) => BusinessUnit, businessUnit => businessUnit.rates, { eager: false, onDelete: 'CASCADE'})
    @JoinColumn()
    businessUnit: BusinessUnit;

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