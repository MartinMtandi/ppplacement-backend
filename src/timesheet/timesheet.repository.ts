import { InternalServerErrorException } from "@nestjs/common";
import { Bookings } from "src/bookings/bookings.entity";
import { EntityRepository, Repository } from "typeorm";
import { TimesheetDto } from "./dto/timesheet.dto";
import { Timesheet } from "./timesheet.entity";

@EntityRepository(Timesheet)
export class TimesheetRepository extends Repository <Timesheet> {
    async createTimesheet(bookings: Bookings, timesheetDto: TimesheetDto) : Promise <Timesheet> {
        let result = this.create({
            ...timesheetDto,
            bookings
        })

        try {
            await this.save(result); 
            return result;
        } catch (error) {
            throw new InternalServerErrorException("Failed to save the timesheet");
        }
    }
}
