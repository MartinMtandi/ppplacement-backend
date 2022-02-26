import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'currentPassword'})
    currentPassword: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'newPassword'})
    newPassword: string;
}