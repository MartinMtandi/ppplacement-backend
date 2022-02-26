import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConsumes, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BookingsService } from 'src/bookings/bookings.service';
import { TimesheetDto } from './dto/timesheet.dto';
import { Timesheet } from './timesheet.entity';
import { TimesheetService } from './timesheet.service';

@ApiTags('Timesheet')
@Controller('timesheet')
export class TimesheetController {
    constructor(private timesheetService: TimesheetService, private bookingService: BookingsService){}
    
    @Get()
    @ApiOkResponse({description: 'Get all Timesheet'})
    getAllTimesheets(): Promise<Timesheet[]>{
        return this.timesheetService.getAllTimesheets();
    }

    @Get(':/id')
    @ApiOkResponse({description: 'Get Timesheet By Id'})
    @ApiBadRequestResponse({description: 'Timesheet Not Found'})
    getTimesheetById(@Param('id', ParseUUIDPipe) id: string): Promise<Timesheet> {
        return this.timesheetService.getTimesheetById(id);
    }

    @Post()
    @ApiOkResponse({description: 'Create a timesheet'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiBadRequestResponse({description: 'Bad request'})
    @ApiConsumes('multipart/form-data')
    async createTimesheet(
        @Body() timesheetDto: TimesheetDto,
    ) : Promise <Timesheet> {
        const bookings = await this.bookingService.getBookingById(timesheetDto.bookingsId);

        return this.timesheetService.createTimesheet(bookings, timesheetDto);
    }
    
}
