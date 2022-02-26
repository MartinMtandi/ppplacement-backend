import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { UpdateAssessmentDto } from "./update-assessment.dto";

export class ExtendUpdateAssessmentDto extends UpdateAssessmentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'id'})
    id: string;
}