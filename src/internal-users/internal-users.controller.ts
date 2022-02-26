import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Tokens } from 'src/auth/types';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/utils/decorators';
import { RefreshTokenGuard } from 'src/utils/guards';
import { InternalSigninDto } from './dto/internal-signin.dto';
import { InternalUsersDto } from './dto/internal-users.dto';
import { InternalUser } from './internal-users.entity';
import { InternalUsersService } from './internal-users.service';

@ApiTags('Internal Users')
@Controller('internal-users')
export class InternalUsersController {
    constructor(private internalUserService: InternalUsersService){}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({ description: 'User Registration' })
    async signUp(@Body() internalUserDto: InternalUsersDto) : Promise<InternalUser>{
        return this.internalUserService.signup(internalUserDto);
    }

    @Public()
    @Post('/signin')
    @ApiOkResponse({ description: 'User login' })
    @HttpCode(HttpStatus.OK)
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    async signIn(@Body() internalSigninDto: InternalSigninDto): Promise <Tokens> {
        return this.internalUserService.signIn(internalSigninDto);
    }

    @Post('/logout')
    @ApiOkResponse({ description: 'User logged out' })
    @HttpCode(HttpStatus.OK)
    async logout (@GetCurrentUserId() userId: string) {
        return this.internalUserService.logout(userId);
    }

    @Get('/:id')
    @ApiOkResponse({description: 'Get User by id'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    getUserById(@Param('id', ParseUUIDPipe) id: string) : Promise <InternalUser> {
        return this.internalUserService.getUserById(id);
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
        return this.internalUserService.refreshToken(userId, refreshToken);
    }
}
