import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ComplianceCheckStatus, User } from 'src/auth/user.entity';
import { GetCurrentUserId } from 'src/utils/decorators';
import { UserAvailabilityDto } from './dto/availality.dto';
import { ProfileComplianceStatusDto } from './dto/compliance.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { ProfilesService } from './profiles.service';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService){}

    @Get()
    @ApiOkResponse({description: 'Get all Profiles'})
    getAllProfiles(): Promise<User[]>{
        return this.profilesService.getAllProfiles();
    }

    @Get('/:id')
    @ApiOkResponse({description: 'Get Profile By Id'})
    @ApiBadRequestResponse({description: 'Profile Not Found'})
    getProfileById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
        return this.profilesService.getProfileById(id);
    }

    @Patch('/:id/user')
    @ApiOkResponse({description: 'Updated Profile By Id'})
    @ApiBadRequestResponse({description: 'Profile Not Found'})
    updateProfileById(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() userProfileDto: UserProfileDto, 
        ): Promise<void>{
        return this.profilesService.updateProfileById(id, userProfileDto);
    }

    @Patch('/:id/compliance-check')
    @ApiOkResponse({description: 'Updated Profile Compliance'})
    @ApiBadRequestResponse({description: 'Profile Not Found'})
    updateProfileComplianceStatus(
        @Param('id', ParseUUIDPipe) id: string, 
        @Body() complianceCheckStatus: ProfileComplianceStatusDto, 
        ): Promise<void>{
        return this.profilesService.updateProfileComplianceStatus(id, complianceCheckStatus);
    }

    @Post('/update-availability')
    @ApiOkResponse({description: 'Updated candidate availablity'})
    @ApiBadRequestResponse({description: 'Profile Not Found'})
    updateUserAvailability(
        @GetCurrentUserId() userId: string, 
        @Body() userAvailablityDto: UserAvailabilityDto, 
        ): Promise<void>{
        return this.profilesService.updateUserAvailability(userId, userAvailablityDto);
    }
}
