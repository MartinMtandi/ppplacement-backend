import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum, IsString, IsBoolean, IsOptional } from "class-validator";

export enum SkillSetType {
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
}

export class SkillsetDto {
    @IsEnum(SkillSetType)
    @IsNotEmpty()
    @ApiProperty({type: Number, description: 'personalHygiene'})
    personalHygiene: SkillSetType;

    @IsEnum(SkillSetType)
    @IsNotEmpty()
    @ApiProperty({type: Number, description: 'toileting'})
    toileting: SkillSetType;

    @IsEnum(SkillSetType)
    @IsNotEmpty()
    @ApiProperty({type: Number, description: 'nutrition'})
    nutrition: SkillSetType;

    @IsEnum(SkillSetType)
    @IsNotEmpty()
    @ApiProperty({type: Number, description: 'mobility'})
    mobility: SkillSetType;

    @IsEnum(SkillSetType)
    @IsNotEmpty()
    @ApiProperty({type: Number, description: 'generalPressureWashing'})
    generalPressureWashing: SkillSetType;

    @IsEnum(SkillSetType)
    @IsNotEmpty()
    @ApiProperty({type: Number, description: 'observation'})
    observation: SkillSetType;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'workingInHospital'})
    workingInHospital: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'hospice'})
    hospice: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'nursingHomes'})
    nursingHomes: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'demetiaPatients'})
    demetiaPatients: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'experienceInFirstAid'})
    experienceInFirstAid: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'reporting'})
    reporting: boolean;

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: 'comments'})
    comments: string;
}