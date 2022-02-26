import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reference {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({nullable: true})
    middlename: string;

    @Column()
    landline: string;

    @Column()
    mobile: string;

    @Column()
    companyName: string;

    @Column()
    jobTitle: string;

    @Column()
    email: string;

    @Column()
    addressLine1: string;

    @Column()
    addressLine2: string;

    @Column()
    town: string;

    @Column()
    county: string;

    @Column()
    postcode: string;

    @ManyToOne((_type) => User, user => user.reference, { eager: false })
    @JoinColumn()
    @Exclude({ toPlainOnly: true })
    user: User
}