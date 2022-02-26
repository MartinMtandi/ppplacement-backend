import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateNextOfKinDto } from "./update-nextofkin.dto";

export class ExtendNextOfKinDto extends UpdateNextOfKinDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'id'})
    id: string;
}