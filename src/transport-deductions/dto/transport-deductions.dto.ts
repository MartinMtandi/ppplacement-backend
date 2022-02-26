import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TransportDeductionsDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'amount'})
    amount: string;
}