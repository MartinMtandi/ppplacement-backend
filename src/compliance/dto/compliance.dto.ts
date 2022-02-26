import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ComplianceDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'userId'})
    userId: string;

    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: 'dbsReferenceNumber'})
    dbsReferenceNumber: string;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'dbsIssueDate'})
    dbsIssueDate: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({type: Date, description: 'permitExpiry'})
    permitExpiry: Date;

    @IsOptional()
    @ApiProperty({type: Object, description: 'resume'})
    resume: any;

    @IsOptional()
    @ApiProperty({type: Object, description: 'dbsCertification'})
    dbsCertification: any;

    @IsOptional()
    @ApiProperty({type: Object, description: 'resume'})
    rightToWork: any;

    @IsOptional()
    @ApiProperty({type: Object, description: 'bankingDetails'})
    bankingDetails: any;

    @IsOptional()
    @ApiProperty({type: Object, description: 'proofOfIdentity'})
    proofOfIdentity: any;

    @IsOptional()
    @ApiProperty({type: Object, description: 'indemnityInsurance'})
    indemnityInsurance: any;

    @IsOptional()
    @ApiProperty({type: Object, description: 'qualifications'})
    qualifications: any;

    @IsOptional()
    @ApiProperty({type: Object, description: 'proofOfAddress'})
    proofOfAddress: any;

    @IsOptional()
    @ApiProperty({type: Object, description: 'profilePicture'})
    profilePicture: any;

    @IsOptional()
    @ApiProperty({type: Boolean, description: 'requireDBS'})
    requireDBS: any;
}