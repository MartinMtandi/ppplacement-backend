import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TimesheetSignatureDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'authorizedPersonSignature'})
    authorizedPersonSignature: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'candidateSignature'})
    candidateSignature: string;
}