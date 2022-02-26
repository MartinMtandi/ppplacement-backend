import { BusinessUnit } from "src/business-unit/business-unit.entity";
import { Rates } from "src/rates/rates.entity";
import { Vacancies } from "src/vacancies/vacancies.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    clientName: string;

    @Column()
    createdBy: string;

    @OneToMany((_type) => BusinessUnit, businessUnit => businessUnit.client, { eager: true })
    businessUnit: BusinessUnit[];

    @OneToMany((_type) => Vacancies, vacancy => vacancy.client, { eager: false })
    vacancy: Vacancies[];
}