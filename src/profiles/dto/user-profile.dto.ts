import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UserProfileDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'title'})
    title: string;

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
    @IsOptional()
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
    @ApiProperty({type: String, description: 'nationality'})
    nationality: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'religion'})
    religion: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: Date, description: 'dob'})
    dob: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'maritalStatus'})
    maritalStatus: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'gender'})
    gender: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'sexualOrientation'})
    sexualOrientation: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'dbsStatus'})
    dbsStatus: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'healthConditions'})
    healthConditions: string;


    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'drivingLicence'})
    drivingLicence: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'convictions'})
    convictions: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'policeEnquiry'})
    policeEnquiry: boolean;

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: 'policeEnquiryReason'})
    policeEnquiryReason: string;

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: 'convictionReason'})
    convictionReason: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'hasCar'})
    hasCar: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'nationalInsurance'})
    nationalInsurance: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'rightToWork'})
    rightToWork: boolean;
}