import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TrainingChargesDto } from './dto/training-charges.dto';
import { TrainingCharges } from './training-charges.entity';
import { TrainingChargesService } from './training-charges.service';

@ApiTags('Training Charges')
@Controller('training-charges')
export class TrainingChargesController {
    constructor(private trainingChargesService: TrainingChargesService){}

    @Get()
    @ApiOkResponse({description: 'Training Charges'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    getTrainingCharges() : Promise <TrainingCharges[]> {
        return this.trainingChargesService.getTrainingCharges();
    }

    @Post()
    @ApiCreatedResponse({description: 'Created Training Charges'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async createTrainingCharges(@Body() trainingChargesDto: TrainingChargesDto) : Promise <TrainingCharges> {
        return this.trainingChargesService.createTrainingCharges(trainingChargesDto);
    }

    @Delete('/:id')
    @ApiOkResponse({description: 'Deleted Training Charge'})
    @ApiBadRequestResponse({description: 'Training Charge Not Found'})
    deleteTrainingCharge(@Param('id', ParseUUIDPipe) id: string): Promise <void> {
        return this.trainingChargesService.deleteTrainingCharge(id);
    }
}