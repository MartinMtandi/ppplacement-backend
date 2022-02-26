import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CustomBookingDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'clientId'})
    clientId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'candidateId'})
    candidateId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'businessUnitId'})
    businessUnitId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'bookingStartDate'})
    bookingStartDate: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'bookingEndDate'})
    bookingEndDate: Date;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type: Number, description: 'positionsAvailable'})
    positionsAvailable: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'specialityId'})
    specialityId: string;
}