import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Receipt {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    receiptSignature: string;

    @OneToOne((_type) => User, candidate => candidate.receipt, {eager: false})
    @JoinColumn()
    @Exclude({ toPlainOnly: true })
    candidate: User;

    @CreateDateColumn({type: "timestamptz"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamptz"})
    updatedAt: Date;
}