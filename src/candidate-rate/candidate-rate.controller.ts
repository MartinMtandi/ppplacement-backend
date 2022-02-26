import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProfilesService } from 'src/profiles/profiles.service';
import { CandidateRate } from './candidate-rate.entity';
import { CandidateRateService } from './candidate-rate.service';
import { CandidateRateDto } from './dto/candidate.rate.dto';
import { UpdateCandidateBillingRateDto } from './dto/updateCandidateBillingRate.dto';

@ApiTags('Candidate Billing Rate')
@Controller('candidate-rate')
export class CandidateRateController {
    constructor(private candidateRateService: CandidateRateService, private profileService: ProfilesService){}

    @Get('/:id')
    @ApiOkResponse({description: 'Get candidate rate by Id'})
    @ApiBadRequestResponse({description: 'Candidate Not Found'})
    getCandidateRateById(@Param('id', ParseUUIDPipe) id: string) : Promise<CandidateRate> {
        return this.candidateRateService.getCandidateRateById(id);
    }

    @Post()
    @ApiCreatedResponse({description: 'Added candidate billing rates'})
    async addCandidateBillingRates(@Body() candidateBillingRatesDto: CandidateRateDto) : Promise <CandidateRate> {
        const candidate = await this.profileService.getProfileById(candidateBillingRatesDto.candidateId);
        return this.candidateRateService.addCandidateBillingRates(candidateBillingRatesDto, candidate);
    }

    @Patch('/:id/billing')
    @ApiOkResponse({description: 'Update Candidate Billing Rate'})
    @ApiBadRequestResponse({description: 'Candidate Billing Rate Not Found'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    updateCandidateBillingRate(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCandidateBillingRateDto: UpdateCandidateBillingRateDto
    ) : Promise<void> {
        return this.candidateRateService.updateCandidateBillingRate(id, updateCandidateBillingRateDto)
    }
}
