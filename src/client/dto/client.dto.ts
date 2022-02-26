import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ClientDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'clientName'})
    clientName: string;
}