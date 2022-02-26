import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Nextofkin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    relation: string;

    @Column()
    firstname: string;

    @Column()
    middlename: string;

    @Column()
    lastname: string;

    @Column()
    mobile: string;

    @Column()
    postcode: string;

    @Column()
    addressLine1: string;

    @Column({nullable: true})
    addressLine2: string;

    @Column()
    town: string;

    @Column()
    county: string;

    @ManyToOne((_type) => User, user => user.nextofkin, { eager: false })
    @JoinColumn()
    @Exclude({ toPlainOnly: true })
    user: User
}