import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookings } from 'src/bookings/bookings.entity';
import { Between } from 'typeorm';
import { TimesheetDto } from './dto/timesheet.dto';
import { Timesheet } from './timesheet.entity';
import { TimesheetRepository } from './timesheet.repository';

@Injectable()
export class TimesheetService {
    constructor(@InjectRepository(TimesheetRepository) private timesheetRepository: TimesheetRepository){}

    async getAllTimesheets(): Promise <Timesheet[]>{
        	
        let endDate = new Date();
        endDate.setDate(endDate.getDate() - endDate.getDay());

        let beginDate = new Date();
        beginDate.setDate(beginDate.getDate() - beginDate.getDay() - 7);
        
        return await this.timesheetRepository.find();

        // return this.timesheetRepository.find({
        //     where: {
        //         endTime: Between(
        //             beginDate,
        //             endDate
        //         )
        //     }
        // });
    }

    async getTimesheetById(id: string) : Promise <Timesheet>{
        try {
            const result = await this.timesheetRepository.findOne(id);

            if(!result){
                throw new NotFoundException("Timesheet not found");
            }

            return result;

        } catch (error) {
            throw new NotFoundException("Timesheet not found")
        }
    }

    createTimesheet(bookings: Bookings, timesheetDto: TimesheetDto) : Promise <Timesheet> {
        try {
            return this.timesheetRepository.createTimesheet(bookings, timesheetDto);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
