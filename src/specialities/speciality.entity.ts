import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Rates } from "src/rates/rates.entity";
import { Vacancies } from "src/vacancies/vacancies.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SpecialityStatus } from "./specialities-status.enum";

@Entity()
export class Speciality {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    status: SpecialityStatus;

    @OneToMany((_type) => User, user => user.speciality, { eager: false, onDelete: 'CASCADE', })
    @Exclude({ toPlainOnly: true })
    user: User[];

    @OneToMany((_type) => Rates, rates => rates.speciality, { eager: false, onDelete: 'CASCADE', })
    @Exclude({ toPlainOnly: true })
    rates: Rates[];

    @OneToMany((_type) => Vacancies, vacancy => vacancy.speciality, { eager: false })
    vacancy: Vacancies
}