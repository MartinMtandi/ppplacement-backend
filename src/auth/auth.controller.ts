import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SpecialitiesService } from 'src/specialities/specialities.service';
import { Tokens } from './types';
import { RefreshTokenGuard } from 'src/utils/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/utils/decorators';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private specialityService: SpecialitiesService){}

    @Public()
    @Post('/signup')
    @ApiCreatedResponse({ description: 'User Registration' })
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<Tokens> {
        const speciality = await this.specialityService.getSpecialityById(authCredentialsDto.specialityId);
        return this.authService.signUp(authCredentialsDto, speciality);
    }

    @Public()
    @Post('/signin')
    @ApiOkResponse({ description: 'User login' })
    @HttpCode(HttpStatus.OK)
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async signIn(
        @Body() loginCredentialsDto: LoginCredentialsDto
    ): Promise<Tokens> {
        return this.authService.signIn(loginCredentialsDto);
    }

    // @Public()
    @Post('/logout')
    @ApiOkResponse({ description: 'User logged out' })
    @HttpCode(HttpStatus.OK)
    async logout (@GetCurrentUserId() userId: string) {
        return this.authService.logout(userId);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post('/refresh')
    @ApiOkResponse({ description: 'Refresh token' })
    @HttpCode(HttpStatus.OK)
    async refreshToken (
        @GetCurrentUserId() userId: string,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ) {
        return this.authService.refreshToken(userId, refreshToken);
    }

    @Patch('/change-password')
    @ApiOkResponse({ description: 'Password updated' })
    @HttpCode(HttpStatus.OK)
    async changePassword(
        @GetCurrentUserId() userId: string,
        @Body() changePasswordDto: ChangePasswordDto, 
    ){
        return this.authService.changePassword(userId, changePasswordDto);
    }
}
