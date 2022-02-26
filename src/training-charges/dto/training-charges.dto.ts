import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TrainingChargesDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'amount'})
    amount: string;
}