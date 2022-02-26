import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { UserProfileDto } from "./user-profile.dto";

export class UpdateUserProfileDto extends UserProfileDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'id'})
    id: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({type: Boolean, description: 'isSubmitted'})
    isSubmitted: boolean;
}