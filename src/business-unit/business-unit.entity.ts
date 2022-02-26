import { Exclude } from "class-transformer";
import { Client } from "src/client/client.entity";
import { Vacancies } from "src/vacancies/vacancies.entity";
import { Rates } from "src/rates/rates.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BusinessUnit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany((_type) => Rates, rates => rates.businessUnit, { eager: true })
    rates: Rates

    @Column()
    businessUnitName: string;

    @Column({nullable: true})
    contactPersonfullname: string;

    @Column({nullable: true})
    contactPersonMobile: string;

    @Column()
    postcode: string;

    @Column()
    addressLine1: string;

    @Column()
    addressLine2: string;

    @Column()
    town: string;

    @Column()
    county: string;

    @ManyToOne((_type) => Client, client => client.businessUnit, { eager: false })
    @JoinColumn()
    @Exclude({ toPlainOnly: true })
    client: Client;

    @OneToMany((_type) => Vacancies, vacancy => vacancy.businessUnit, { eager: false })
    vacancy: Vacancies[];

}