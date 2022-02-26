import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ReceiptDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'receiptSignature'})
    receiptSignature: string;
}