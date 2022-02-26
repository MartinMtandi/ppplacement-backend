import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateMandatoryTrainingDto } from "./update-mandatory-training.dto";

export class TrainingsDto extends UpdateMandatoryTrainingDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'id'})
    id: string;
}