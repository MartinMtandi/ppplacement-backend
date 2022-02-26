import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MandatoryTrainings {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('boolean', {default: false})
    basicLifeSupport: boolean = false;

    @Column('boolean', {default: false})
    healthSafetyWelfare: boolean = false;

    @Column('boolean', {default: false})
    healthCareCareer: boolean = false;

    @Column('boolean', {default: false})
    infectionPrevention: boolean = false;

    @Column('boolean', {default: false})
    preventingRadicalisation: boolean = false;

    @Column('boolean', {default: false})
    informationGovernance: boolean = false;

    @Column('boolean', {default: false})
    physicalRestraintAwareness: boolean = false;

    @Column('boolean', {default: false})
    personCentredCare: boolean = false;

    @Column('boolean', {default: false})
    consent: boolean = false;

    @Column('boolean', {default: false})
    fluidsNutrition: boolean = false;

    @Column('boolean', {default: false})
    movingAndHandling: boolean = false;

    @Column('boolean', {default: false})
    bloodComponentTransfusion: boolean = false;

    @Column('boolean', {default: false})
    equalityDiversityHumanRights: boolean = false;

    @Column('boolean', {default: false})
    handlingViolence: boolean = false;

    @Column('boolean', {default: false})
    fireSafety: boolean = false;

    @Column('boolean', {default: false})
    safeguardingChildren: boolean = false;

    @Column('boolean', {default: false})
    safeguardingAdults: boolean = false;

    @Column('boolean', {default: false})
    foodHygiene: boolean = false;

    @Column('boolean', {default: false})
    dutyOfCare: boolean = false;

    @Column('boolean', {default: false})
    communication: boolean = false;

    @Column('boolean', {default: false})
    privacyAndDignity: boolean = false;

    @Column('boolean', {default: false})
    dementiaAwareness: boolean = false;

    @OneToOne((_type) => User, user => user.training, { eager: false })
    @JoinColumn()
    @Exclude({ toPlainOnly: true })
    user: User

    @Column({nullable: true})
    handlingViolenceTrainedAt: Date;

    @Column({nullable: true})
    equalityDiversityHumanRightsTrainedAt: Date;

    @Column({nullable: true})
    bloodComponentTransfusionTrainedAt: Date;

    @Column({nullable: true})
    movingAndHandlingTrainedAt: Date;

    @Column({nullable: true})
    fluidsNutritionTrainedAt: Date;

    @Column({nullable: true})
    consentTrainedAt: Date;

    @Column({nullable: true})
    personCentredCareTrainedAt: Date;

    @Column({nullable: true})
    physicalRestraintAwarenessTrainedAt: Date;

    @Column({nullable: true})
    informationGovernanceTrainedAt: Date;

    @Column({nullable: true})
    preventingRadicalisationTrainedAt: Date;

    @Column({nullable: true})
    infectionPreventionTrainedAt: Date;

    @Column({nullable: true})
    healthCareCareerTrainedAt: Date;

    @Column({nullable: true})
    healthSafetyWelfareTrainedAt: Date;

    @Column({nullable: true})
    basicLifeSupportTrainedAt: Date;

    @Column({nullable: true})
    safeguardingChildrenTrainedAt: Date;

    @Column({nullable: true})
    safeguardingAdultsTrainedAt: Date;

    @Column({nullable: true})
    foodHygieneTrainedAt: Date;

    @Column({nullable: true})
    dutyOfCareTrainedAt: Date;

    @Column({nullable: true})
    communicationTrainedAt: Date;

    @Column({nullable: true})
    privacyAndDignityTrainedAt: Date;

    @Column({nullable: true})
    dementiaAwarenessTrainedAt: Date;

    @Column({nullable: true})
    fireSafetyTrainedAt: Date;
}