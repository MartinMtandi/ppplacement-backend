import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class UserAvailabilityDto {
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'isAvailable'})
    isAvailable: boolean;
}