import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TimesheetDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'startTime'})
    bookingDate: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'startTime'})
    startTime: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'endTime'})
    endTime: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'breakTime'})
    breakTime: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'totalHoursWorked'})
    totalHoursWorked: string;

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: 'comment'})
    comment: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'authorizedPerson'})
    authorizedPerson: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'authorizedPersonSignature'})
    authorizedPersonSignature: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'candidateSignature'})
    candidateSignature: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'bookingsId'})
    bookingsId: string;
}