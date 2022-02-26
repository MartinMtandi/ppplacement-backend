import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMandatoryTrainingDto {
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'basicLifeSupport'})
    basicLifeSupport: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'healthSafetyWelfare'})
    healthSafetyWelfare: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'healthCareCareer'})
    healthCareCareer: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'infectionPrevention'})
    infectionPrevention: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'preventingRadicalisation'})
    preventingRadicalisation: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'informationGovernance'})
    informationGovernance: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'physicalRestraintAwareness'})
    physicalRestraintAwareness: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'personCentredCare'})
    personCentredCare: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'consent'})
    consent: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'fluidsNutrition'})
    fluidsNutrition: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'movingAndHandling'})
    movingAndHandling: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'bloodComponentTransfusion'})
    bloodComponentTransfusion: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'equalityDiversityHumanRights'})
    equalityDiversityHumanRights: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'handlingViolence'})
    handlingViolence: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'fireSafety'})
    fireSafety: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'safeguardingChildren'})
    safeguardingChildren: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'safeguardingAdults'})
    safeguardingAdults: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'foodHygiene'})
    foodHygiene: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'dutyOfCare'})
    dutyOfCare: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'communication'})
    communication: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'privacyAndDignity'})
    privacyAndDignity: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'dementiaAwareness'})
    dementiaAwareness: boolean;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'basicLifeSupportTrainedAt'})
    basicLifeSupportTrainedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'healthSafetyWelfareTrainedAt'})
    healthSafetyWelfareTrainedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'healthCareCareerTrainedAt'})
    healthCareCareerTrainedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'infectionPreventionTrainedAt'})
    infectionPreventionTrainedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'preventingRadicalisationTrainedAt'})
    preventingRadicalisationTrainedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'informationGovernanceTrainedAt'})
    informationGovernanceTrainedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'physicalRestraintAwarenessTrainedAt'})
    physicalRestraintAwarenessTrainedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'personCentredCareTrainedAt'})
    personCentredCareTrainedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'consentTrainedAt'})
    consentTrainedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'fluidsNutritionTrainedAt'})
    fluidsNutritionTrainedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'movingAndHandlingTrainedAt'})
    movingAndHandlingTrainedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'bloodComponentTransfusionTrainedAt'})
    bloodComponentTransfusionTrainedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'equalityDiversityHumanRightsTrainedAt'})
    equalityDiversityHumanRightsTrainedAt: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'handlingViolenceTrainedAt'})
    handlingViolenceTrainedAt: Date;
}