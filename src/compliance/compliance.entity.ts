import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Compliance {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    resume: string;

    @Column({nullable: true})
    indemnityInsurance: string;

    @Column({nullable: true})
    rightToWork: string;

    @Column({nullable: true})
    permitExpiry: Date;

    @Column({nullable: true})
    bankingDetails: string;

    @Column({nullable: true})
    proofOfIdentity: string;

    @Column({nullable: true})
    proofOfAddress: string;

    @Column({nullable: true})
    qualifications: string;

    @Column({nullable: true})
    dbsCertification: string;

    @Column({nullable: true})
    dbsReferenceNumber: string;

    @Column({nullable: true})
    profilePicture: string;

    @Column({nullable: true})
    dbsIssueDate: Date;

    @Column({nullable: true})
    dbsExpiry: Date;

    @Column('boolean', {default: false})
    requireDBS: boolean = false;

    @OneToOne((_type) => User, user => user.compliance, { eager: false })
    @JoinColumn()
    @Exclude({ toPlainOnly: true })
    user: User
}