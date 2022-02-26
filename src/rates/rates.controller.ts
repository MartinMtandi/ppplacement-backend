import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RatesService } from './rates.service';
import { SpecialitiesService } from 'src/specialities/specialities.service';
import { RatesDto } from './dto/rates.dto';
import { Rates } from './rates.entity';
import { BusinessUnitService } from 'src/business-unit/business-unit.service';

@ApiTags('Rates')
@Controller('rates')
export class RatesController {
    constructor(private ratesService: RatesService, private businessUnitService: BusinessUnitService, private specialityService: SpecialitiesService){}

    @Get()
    @ApiOkResponse({description: 'Get all billing rates'})
    getAllBillingRates() : Promise <Rates[]> {
        return this.ratesService.getAllBillingRates();
    }

    @Get('/:id/billing')
    @ApiOkResponse({description: 'Get Billing Rates By Id'})
    getBillingRatesById(@Param('id', ParseUUIDPipe) id: string) : Promise <Rates> {
        return this.ratesService.getBillingRatesById(id);
    }

    @Post()
    @ApiCreatedResponse({description: 'Added billing rates'})
    async addBillingRates(@Body() ratesDto: RatesDto) : Promise<Rates> {
        const businessUnit = await this.businessUnitService.getBusinessUnitById(ratesDto.businessUnitId);
        const speciality = await this.specialityService.getSpecialityById(ratesDto.specialityId);

        return this.ratesService.addRates(ratesDto, businessUnit, speciality);
    }

    @Patch('/:id/billing')
    @ApiOkResponse({description: 'Update Billing Rates'})
    @ApiBadRequestResponse({description: 'Record not found'})
    updateBillingRate(@Param('id', ParseUUIDPipe) id: string, @Body() ratesDto: RatesDto) : Promise <void> {
        return this.ratesService.updateBillingRate(id, ratesDto);
    }
}
