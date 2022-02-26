import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProfilesService } from 'src/profiles/profiles.service';
import { GetCurrentUserId } from 'src/utils/decorators';
import { Contract } from './contract.entity';
import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';


@ApiTags('Contract')
@Controller('contract')
export class ContractController {
    constructor(private contractService: ContractService, private profileService: ProfilesService) {}

    @Get('/:id')
    @ApiOkResponse({description: 'Get Contract Signatures'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async getCandidateContractSignatures(@Param('id', ParseUUIDPipe) id: string): Promise<Contract>{
        const user = await this.profileService.getProfileById(id);
        return this.contractService.getCandidateContractSignatures(user);
    }

    @Post()
    @ApiCreatedResponse({description: 'Sign for Contract Docs'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async createContract(@GetCurrentUserId() userId: string, @Body() contractDto: ContractDto) : Promise<Contract>{
        const user = await this.profileService.getProfileById(userId);

        return this.contractService.createContract(user, contractDto);

    }
}
