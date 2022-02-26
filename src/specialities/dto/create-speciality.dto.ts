import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateSpecialityDto {
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'title'})
    title: string
}