import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/utils/decorators';
import { CandidateAvailability } from './candidate-availability.entity';
import { CandidateAvailabilityService } from './candidate-availability.service';
import { CandidateAvailabilityDto } from './dto/candidate-availability.dto';

@ApiTags("Candidate Availability")
@Controller('candidate-availability')
export class CandidateAvailabilityController {
    constructor(private candidateAvailabityService: CandidateAvailabilityService) {}

    @Post()
    @ApiCreatedResponse({description: 'Created Candidate Training'})
    async createCandidateAvailability(
        @GetCurrentUserId() userId: string, 
        @Body() candidateAvailabilityDto: CandidateAvailabilityDto
    ): Promise<void> {
        return await this.candidateAvailabityService.createCandidateAvailability(userId, candidateAvailabilityDto);
    } 
    
    @Get('/:id')
    @ApiOkResponse({description: 'Get Candidate Availability By Candidate Id'})
    @ApiBadRequestResponse({description: 'Candidate Not Found'})
    getCandidateAvailabilityById(@Param('id', ParseUUIDPipe) id: string) : Promise <CandidateAvailability[]>{
        return this.candidateAvailabityService.getCandidateAvailabilityById(id);
    }
}
