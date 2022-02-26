import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class BookingsDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'vacancyId'})
    vacancyId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'candidateId'})
    candidateId: string;
}