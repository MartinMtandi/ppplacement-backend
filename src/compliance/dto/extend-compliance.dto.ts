import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ComplianceDto } from "./compliance.dto";

export class ExtendComplianceDto extends ComplianceDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'resume'})
    resume: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'indemnityInsurance'})
    indemnityInsurance: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'rightToWork'})
    rightToWork: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({type: Date, description: 'permitExpiry'})
    permitExpiry: Date;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'bankingDetails'})
    bankingDetails: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'proofOfIdentity'})
    proofOfIdentity: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'proofOfAddress'})
    proofOfAddress: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'qualifications'})
    qualifications: string;

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: 'dbsCertification'})
    dbsCertification: string;

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: 'dbsReferenceNumber'})
    dbsReferenceNumber: string;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'dbsIssueDate'})
    dbsIssueDate: Date;

    @IsBoolean()
    @ApiProperty({type: Boolean, description: 'requireDBS'})
    requireDBS: boolean;
}