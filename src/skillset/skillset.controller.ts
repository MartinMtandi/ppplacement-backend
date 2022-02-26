import { Body, Controller, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from 'src/profiles/profiles.service';
import { GetCurrentUserId } from 'src/utils/decorators';
import { SkillsetDto } from './dto/skill-set.dto';
import { UpdateSkillsetDto } from './dto/update-skill-set.dto';
import { SkillSet } from './skillset.entity';
import { SkillsetService } from './skillset.service';

@ApiTags('Skill Set')
@Controller('skillset')
export class SkillsetController {
    constructor(private skillsetService: SkillsetService, private profileService: ProfilesService){}

    @Post()
    @ApiCreatedResponse({description: 'Created User Skillset'})
    @ApiBadRequestResponse({description: 'Bad Request'})
    async createUserSkillSet(
        @GetCurrentUserId() userId: string, 
        @Body() skillsetDto: SkillsetDto
        ) : Promise <SkillSet> {
        const user = await this.profileService.getProfileById(userId);
        return this.skillsetService.createUserSkillset(skillsetDto, user);
    }

    @Patch('/:id/update')
    @ApiOkResponse({description: 'Update User Skill Set'})
    @ApiBadRequestResponse({description: 'User Skill Set Not Found'})
    updateUserSkillSet(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateSkillSetDto: UpdateSkillsetDto
    ): Promise <void> {
        return this.skillsetService.updateUserSkillSet(id, updateSkillSetDto);
    }
}
