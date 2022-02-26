import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TransportDeductionsDto } from './dto/transport-deductions.dto';
import { TransportDeductions } from './transport-deductions.entity';
import { TransportDeductionsService } from './transport-deductions.service';

@ApiTags('Transport Deductions')
@Controller('transport-deductions')
export class TransportDeductionsController {
    constructor(private transportDeductionsService: TransportDeductionsService){}

    @Get()
    @ApiOkResponse({description: 'Transport Deductions'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    getTransportDeductions(): Promise<TransportDeductions[]>{
        return this.transportDeductionsService.getTransportDeductions();
    }

    @Post()
    @ApiCreatedResponse({description: 'Created Transport Deduction'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async createTransportDeductions(@Body() transportDeductionsDto: TransportDeductionsDto) : Promise <TransportDeductions> {
        return this.transportDeductionsService.createTransportDeductions(transportDeductionsDto);
    }

    @Delete('/:id')
    @ApiOkResponse({description: 'Deleted Transport deductions'})
    @ApiBadRequestResponse({description: 'Transport deduction Not Found'})
    deleteTransportDeductions(@Param('id', ParseUUIDPipe) id: string) : Promise <void> {
        return this.transportDeductionsService.deleteTransportDeductions(id);
    }
}
