import { Body, Controller, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from 'src/profiles/profiles.service';
import { GetCurrentUserId } from 'src/utils/decorators';
import { NextOfKinDto } from './dto/next-of-kin.dto';
import { UpdateNextOfKinDto } from './dto/update-nextofkin.dto';
import { Nextofkin } from './nextofkin.entity';
import { NextofkinsService } from './nextofkins.service';

@ApiTags('Next of kin')
@Controller('nextofkins')
export class NextofkinsController {
    constructor(private nextofkinService: NextofkinsService, private profileService: ProfilesService){}

    @Post()
    @ApiCreatedResponse({description: 'Created Next Of Kin'})
    async createNextofkin(
        @GetCurrentUserId() userId: string, 
        @Body() nextofkinDto: NextOfKinDto
    ) : Promise<Nextofkin> {
        const user = await this.profileService.getProfileById(userId);
        return this.nextofkinService.createNextofkin(nextofkinDto, user);
    }

    @Patch('/:id/details')
    @ApiOkResponse({description: 'Update Next Of Kin'})
    @ApiBadRequestResponse({description: 'Next Of Kin Not Found'})
    updateNextofkin(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateNextofkinDto: UpdateNextOfKinDto,
    ) : Promise<void> {
        return this.nextofkinService.updateNextofkin(id, updateNextofkinDto);
    }
}
