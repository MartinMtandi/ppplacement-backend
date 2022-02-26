import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'email'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, description: 'specialityId'})
    specialityId: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain atleast 1 uppercase letter, 1 lowercase letter, 1 number or special character',
    })
    @ApiProperty({type: String, description: 'password'})
    password: string;
}