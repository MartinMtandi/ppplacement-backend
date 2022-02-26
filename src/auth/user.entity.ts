import { Assessment } from "src/assessment/assessment.entity";
import { Bookings } from "src/bookings/bookings.entity";
import { CandidateRate } from "src/candidate-rate/candidate-rate.entity";
import { Compliance } from "src/compliance/compliance.entity";
import { Contract } from "src/contract/contract.entity";
import { Nextofkin } from "src/nextofkins/nextofkin.entity";
import { Receipt } from "src/receipt/receipt.entity";
import { Reference } from "src/reference/reference.entity";
import { SkillSet } from "src/skillset/skillset.entity";
import { Speciality } from "src/specialities/speciality.entity";
import { MandatoryTrainings } from "src/trainings/mandatory-trainings.entity";
import { Vacancies } from "src/vacancies/vacancies.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum UserStatus {
    ACTIVE = "ACTIVE",
    IN_ACTIVE = "IN-ACTIVE",
    DELETED = "DELETED"
}

export enum ComplianceCheckStatus {
    UN_VERIFIED = "UN-VERIFIED",
    COMPLIANT = "COMPLIANT",
    NOT_COMPLIANT = "NOT-COMPLIANT"
}

export enum UserRole {
    CANDIDATE = "CANDIDATE",
    AGENT = "AGENT",
    ACCOUNTING = "ACCOUNTING",
    ADMINISTRATION = "ADMINISTRATION"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    title: string;

    @Column({nullable: true})
    firstname: string;

    @Column({nullable: true})
    middlename: string;

    @Column({nullable: true})
    lastname: string;

    @Column({nullable: true, unique: true})
    mobile: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column('boolean', {default: false})
    isSubmitted: boolean = false;

    @Column({
        type: "enum",
        enum: UserStatus,
        default: UserStatus.ACTIVE
    })
    status: UserStatus;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CANDIDATE
    })
    role: UserRole;

    @Column({nullable: true})
    postcode: string;

    @Column({nullable: true})
    addressLine1: string;

    @Column({nullable: true})
    addressLine2: string;

    @Column({nullable: true})
    town: string;

    @Column({nullable: true})
    county: string;

    @Column({nullable: true})
    nationality: string;

    @Column({nullable: true})
    religion: string;

    @Column({nullable: true})
    healthConditions: string;

    @Column({nullable: true})
    dob: string;

    @Column({nullable: true})
    maritalStatus: string;

    @Column({nullable: true})
    gender: string;

    @Column({nullable: true})
    sexualOrientation: string;

    @Column('boolean', {default: false, nullable: true})
    dbsStatus: boolean = false;

    @Column('boolean', {default: false, nullable: true})
    drivingLicence: boolean = false;

    @Column('boolean', {default: false, nullable: true})
    convictions: boolean = false;

    @Column('boolean', {default: false, nullable: true})
    policeEnquiry: boolean = false;

    @Column('boolean', {default: false, nullable: true})
    hasCar: boolean = false;

    @Column({nullable: true, unique: true})
    nationalInsurance: string;

    @Column('boolean', {default: false, nullable: true})
    rightToWork: boolean = false;

    @Column({nullable: true})
    convictionReason: string;

    @Column({nullable: true})
    policeEnquiryReason: string;

    @Column({nullable: true})
    refresh_token: string;

    @Column('boolean', {default: false})
    isAvailable: boolean = false;

    @Column({
        type: "enum",
        enum: ComplianceCheckStatus,
        default: ComplianceCheckStatus.UN_VERIFIED
    })
    isVerified: ComplianceCheckStatus;

    @ManyToOne((_type) => Speciality, speciality => speciality.user, { eager: true,  onDelete: 'CASCADE' })
    @JoinColumn()
    speciality: Speciality;

    @OneToMany((_type) => Nextofkin, nextofkin => nextofkin.user, { eager: true, onDelete: 'CASCADE' })
    nextofkin: Nextofkin[];

    @OneToOne((_type) => MandatoryTrainings, training => training.user, { eager: true, onDelete: 'CASCADE' })
    training: MandatoryTrainings;

    @OneToOne((_type) => SkillSet, skillset => skillset.user, { eager: true, onDelete: 'CASCADE' })
    skillset: SkillSet;

    @OneToOne((_type) => Assessment, assessment => assessment.user, { eager: true, onDelete: 'CASCADE' })
    assessment: Assessment;

    @OneToOne((_type) => Compliance, compliance => compliance.user, { eager: true, onDelete: 'CASCADE' })
    compliance: Compliance;

    @OneToMany((_type) => Reference, reference => reference.user, { eager: true, onDelete: 'CASCADE' })
    reference: Reference[];

    @OneToMany((_type) => Bookings, bookings => bookings.candidate, { eager: false, onDelete: 'CASCADE' })
    bookings: Bookings[];

    @ManyToMany((_type) => Vacancies, vacancy => vacancy.candidate, { eager: false, onDelete: 'CASCADE' })
    vacancy: Vacancies[];

    @OneToOne((_type) => CandidateRate, rate => rate.candidate, { eager: true, onDelete: 'CASCADE' })
    rate: CandidateRate

    @OneToOne((_type) => Contract, contract => contract.candidate, { eager: true, onDelete: 'CASCADE' })
    contract: Contract;

    @OneToOne((_type) => Receipt, receipt => receipt.candidate, { eager: true, onDelete: 'CASCADE' })
    receipt: Receipt;
}