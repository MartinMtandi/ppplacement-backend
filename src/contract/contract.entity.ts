import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Contract {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    contractSignature: string;

    @Column()
    consentSignature: string;

    @Column()
    optOutSignature: string;

    @OneToOne((_type) => User, candidate => candidate.contract, {eager: false})
    @JoinColumn()
    @Exclude({ toPlainOnly: true })
    candidate: User;

    @CreateDateColumn({type: "timestamptz"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamptz"})
    updatedAt: Date;
}