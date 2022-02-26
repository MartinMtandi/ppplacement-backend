import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { UpdateReferenceDto } from "./update-reference.dto";

export class ExtendUpdateReferenceDto extends UpdateReferenceDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'id'})
    id: string;
}