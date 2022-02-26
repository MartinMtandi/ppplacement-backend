import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RatesDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'specialityId'})
    specialityId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'businessUnitId'})
    businessUnitId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'weekday'})
    weekday: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'weeknight'})
    weeknight: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'saturdayday'})
    saturdayday: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'saturdaynight'})
    saturdaynight: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'sundayday'})
    sundayday: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'sundaynight'})
    sundaynight: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'sleep_in'})
    sleep_in: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'bankholidayday'})
    bankholidayday: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'bankholidaynight'})
    bankholidaynight: string;
}