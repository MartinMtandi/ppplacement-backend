import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SkillSet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    personalHygiene: number;

    @Column()
    toileting: number;

    @Column()
    nutrition: number;

    @Column()
    mobility: number;

    @Column()
    generalPressureWashing: number;

    @Column()
    observation: number;

    @Column('boolean', {default: false, nullable: true})
    workingInHospital: boolean = false;

    @Column('boolean', {default: false, nullable: true})
    hospice: boolean = false;

    @Column('boolean', {default: false, nullable: true})
    nursingHomes: boolean = false;

    @Column('boolean', {default: false, nullable: true})
    demetiaPatients: boolean = false;

    @Column('boolean', {default: false, nullable: true})
    experienceInFirstAid: boolean = false;

    @Column('boolean', {default: false, nullable: true})
    reporting: boolean = false;

    @Column({nullable: true})
    comments: string;

    @OneToOne((_type) => User, user => user.skillset, { eager: false })
    @JoinColumn()
    @Exclude({ toPlainOnly: true })
    user: User
}