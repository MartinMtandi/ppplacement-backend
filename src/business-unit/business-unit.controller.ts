import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BusinessUnitService } from './business-unit.service';
import { BusinessUnitDto } from './dto/business-unit.dto';
import { BusinessUnit } from "./business-unit.entity";
import { ClientService } from 'src/client/client.service';
import { UpdateBusinessUnitDto } from './dto/update-business-unit.dto';

@ApiTags('Business Unit')
@Controller('business-unit')
export class BusinessUnitController {
    constructor(private businessUnitService: BusinessUnitService, private clientService: ClientService){}

    @Post()
    @ApiCreatedResponse({description: 'Created new client'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async createBusinessUnit (@Body() businessUnitDto: BusinessUnitDto) : Promise <BusinessUnit>{
        const client = await this.clientService.getClientById(businessUnitDto.clientId);
        return this.businessUnitService.createBusinessUnit(businessUnitDto, client);
    }

    @Get(':/id')
    @ApiOkResponse({description: 'Get Business Unit By Id'})
    @ApiBadRequestResponse({description: 'Business Unit Not Found'})
    getBusinessUnitById(@Param('id', ParseUUIDPipe) id: string) : Promise<BusinessUnit>{
        return this.businessUnitService.getBusinessUnitById(id);
    }

    @Patch('/:id/update')
    @ApiOkResponse({description: 'Update Business Unit'})
    @ApiBadRequestResponse({description: 'Business Unit Not Found'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    updateBusinessUnit(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateBusinessUnitDto: UpdateBusinessUnitDto
    ) : Promise <void> {
        return this.businessUnitService.updateBusinessUnit(id, updateBusinessUnitDto);
    }
}
