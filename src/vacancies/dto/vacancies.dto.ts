import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ShiftType } from "../vacancies.entity";

export class VacanciesDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'bookingEndDate'})
    bookingEndDate: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'bookingStartDate'})
    bookingStartDate: Date;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type: Number, description: 'positionsAvailable'})
    positionsAvailable: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'clientId'})
    clientId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'businessUnitId'})
    businessUnitId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'specialityId'})
    specialityId: string;
}