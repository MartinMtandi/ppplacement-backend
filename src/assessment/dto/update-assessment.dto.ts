import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAssessmentDto {
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'diabetes'})
    diabetes: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'ulcers'})
    ulcers: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'circulatoryProblems'})
    circulatoryProblems: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'difficultyInSleeping'})
    difficultyInSleeping: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'medicalCondition'})
    medicalCondition: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'chronicChest'})
    chronicChest: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'mentalHealthProblem'})
    mentalHealthProblem: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'otherMedicalCondition'})
    otherMedicalCondition: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'nightShiftIllHealth'})
    nightShiftIllHealth: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'isMother'})
    isMother: boolean;

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: 'comments'})
    comments: string;
}