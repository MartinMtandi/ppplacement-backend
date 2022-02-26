import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class BusinessUnitDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'businessUnitName'})
    businessUnitName: string;

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: 'contactPersonfullname'})
    contactPersonfullname: string;

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: 'contactPersonMobile'})
    contactPersonMobile: string;

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

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'clientId'})
    clientId: string;

}