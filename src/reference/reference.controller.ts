import { Body, Controller, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from 'src/profiles/profiles.service';
import { GetCurrentUserId } from 'src/utils/decorators';
import { ReferenceDto } from './dto/reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { ReferenceService } from './reference.service';

@ApiTags('Reference')
@Controller('reference')
export class ReferenceController {
    constructor(private referenceService: ReferenceService, private profileService: ProfilesService){}

    @Post()
    @ApiCreatedResponse({description: 'Created User Reference'})
    @ApiBadRequestResponse({description: 'Bad Request'})
    async createReferences(
        @GetCurrentUserId() userId: string, 
        @Body() referenceDto: ReferenceDto[]
    ) : Promise <void> {
        const user = await this.profileService.getProfileById(userId);
        return this.referenceService.createReferences(referenceDto, user);
    }

    @Patch('/:id/update')
    @ApiOkResponse({description: 'Update User Reference'})
    @ApiBadRequestResponse({description: 'User Reference Not Found'})
    updateUserReference(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateReferenceDto: UpdateReferenceDto
     ): Promise <void> {
         return this.referenceService.updateUserReference(id, updateReferenceDto);
     }

}
