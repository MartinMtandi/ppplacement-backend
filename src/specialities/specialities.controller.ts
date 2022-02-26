import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/utils/decorators';

import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityStatusDto } from './dto/update-speciality-status.dto';
import { SpecialitiesService } from './specialities.service';
import { Speciality } from './speciality.entity';
@ApiTags('Specialities')
@Controller('specialities')
export class SpecialitiesController {
    constructor(private specialitiesService: SpecialitiesService){}

    @Public()
    @Get()
    @ApiOkResponse({description: 'Get All Specialities'})
    getAllSpecialities(): Promise<Speciality[]>{
        return this.specialitiesService.getSpecialities();
    }

    @Get('/:id')
    @ApiOkResponse({description: 'Get Speciality By Id'})
    @ApiBadRequestResponse({description: 'Speciality Not Found'})
    getSpecialityById(@Param('id', ParseUUIDPipe) id: string): Promise<Speciality> {
        return this.specialitiesService.getSpecialityById(id);
    }

    @Post()
    @ApiCreatedResponse({description: 'Created Speciality'})
    createSpeciality(@Body() createSpecialityDto: CreateSpecialityDto): Promise<Speciality> {
        return this.specialitiesService.createSpeciality(createSpecialityDto);
    }

    @Delete('/:id')
    @ApiOkResponse({description: 'Deleted Speciality'})
    @ApiBadRequestResponse({description: 'Speciality Not Found'})
    deleteSpeciality(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.specialitiesService.deleteSpeciality(id);
    }

    @Patch('/:id/status')
    @ApiOkResponse({description: 'Updated Speciality'})
    @ApiBadRequestResponse({description: 'Speciality Not Found'})
    updateSpecialityStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateSpecialityStatusDto: UpdateSpecialityStatusDto,
    ): Promise<Speciality>{
        const { status } = updateSpecialityStatusDto;
        return this.specialitiesService.updateSpecialityStatus(id, status);
    }
}
