import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { UpdateSkillsetDto } from "./update-skill-set.dto";

export class ExtendUpdateSkillSetDto extends UpdateSkillsetDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'id'})
    id: string;
}