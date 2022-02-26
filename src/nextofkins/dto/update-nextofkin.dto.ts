import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNextOfKinDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'firstname'})
    firstname: string;

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: 'middlename'})
    middlename: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'lastname'})
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'mobile'})
    mobile: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'postcode'})
    postcode: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'addressLine1'})
    addressLine1: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'addressLine2'})
    addressLine2: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'town'})
    town: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'county'})
    county: string;
}