import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CandidateAvailabilityDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: Date, description: 'shiftDate'})
    shiftDate: Date;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({type: Boolean, description: 'early'})
    early: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({type: Boolean, description: 'long'})
    long: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({type: Boolean, description: 'late'})
    late: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({type: Boolean, description: 'sleepIn'})
    sleepIn: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({type: Boolean, description: 'night'})
    night: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({type: Boolean, description: 'unAvailable'})
    unAvailable: boolean;
}