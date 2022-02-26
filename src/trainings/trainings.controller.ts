import { Body, Controller, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from 'src/profiles/profiles.service';
import { GetCurrentUserId } from 'src/utils/decorators';
import { MandatoryTrainingsDto } from './dto/mandatory-trainings.dto';
import { UpdateMandatoryTrainingDto } from './dto/update-mandatory-training.dto';
import { MandatoryTrainings } from './mandatory-trainings.entity';
import { TrainingsService } from './trainings.service';

@ApiTags("Mandatory Trainings")
@Controller('trainings')
export class TrainingsController {
    constructor(private trainingService: TrainingsService, private profileService: ProfilesService){}

    @Post()
    @ApiCreatedResponse({description: 'Created Mandatory Trainings'})
    async createMandatoryTraining(
        @GetCurrentUserId() userId: string, 
        @Body() mandatoryTrainingDto: MandatoryTrainingsDto
    ): Promise<MandatoryTrainings> {
        const user  = await this.profileService.getProfileById(userId);
        return this.trainingService.createMandatoryTraining(mandatoryTrainingDto, user);
    }

    @Patch('/:id/update')
    @ApiOkResponse({description: 'Update User Mandatory Training'})
    @ApiBadRequestResponse({description: 'Mandatory Training Not Found'})
    updateUserMandatoryTraining(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateMandatoryTrainingDto: UpdateMandatoryTrainingDto
    ) : Promise<void> {
        return this.trainingService.updateUserMandatoryTraining(id, updateMandatoryTrainingDto);
    }
}
