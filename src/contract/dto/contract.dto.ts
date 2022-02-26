import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ContractDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'contractSignature'})
    contractSignature: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'consentSignature'})
    consentSignature: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'optOutSignature'})
    optOutSignature: string;
}