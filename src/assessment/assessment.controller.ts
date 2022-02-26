import { Body, Controller, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProfilesService } from 'src/profiles/profiles.service';
import { GetCurrentUserId } from 'src/utils/decorators';
import { Assessment } from './assessment.entity';
import { AssessmentService } from './assessment.service';
import { AssessmentDto } from './dto/assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@ApiTags('Assessment')
@Controller('assessment') 
export class AssessmentController {
    constructor(private assessmentService: AssessmentService, private profileService: ProfilesService){}

    @Post()
    @ApiCreatedResponse({description: 'Created User Assessment'})
    @ApiBadRequestResponse({description: 'Bad Request'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async createUserAssessment(
        @GetCurrentUserId() userId: string, 
        @Body() assessmentDto: AssessmentDto
    ) : Promise<Assessment> {
        const user = await this.profileService.getProfileById(userId);
        return this.assessmentService.createUserAssessment(assessmentDto, user);
    }

    @Patch('/:id/update')
    @ApiOkResponse({description: 'Update User Assessment'})
    @ApiBadRequestResponse({description: 'User Assessment Not Found'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    updateUserAssessment(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUserAssessmentDto: UpdateAssessmentDto
    ) : Promise <void> {
        return this.assessmentService.updateUserAssessment(id, updateUserAssessmentDto)
    }
}
