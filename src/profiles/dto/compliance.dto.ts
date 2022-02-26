import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { ComplianceCheckStatus } from "src/auth/user.entity";

export class ProfileComplianceStatusDto {
    @IsEnum(ComplianceCheckStatus)
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'isVerified'})
    isVerified: ComplianceCheckStatus
}