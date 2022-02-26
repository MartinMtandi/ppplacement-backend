import { Vacancies } from "src/vacancies/vacancies.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

enum UserRole {
    CANDIDATE = "CANDIDATE",
    AGENT = "AGENT",
    ACCOUNTING = "ACCOUNTING",
    ADMINISTRATION = "ADMINISTRATION"
}

@Entity()
export class InternalUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstname: string;

    @Column()
    middlename: string;

    @Column()
    lastname: string;

    @Column({unique: true})
    mobile: string;

    @Column({unique: true})
    email: string;

    @Column({nullable: true})
    refresh_token: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.AGENT
    })
    role: UserRole;

    @Column()
    password: string;

    @OneToMany((_type) => Vacancies, vacancy => vacancy.createdBy, { eager: false})
    vacancy: Vacancies[];
}