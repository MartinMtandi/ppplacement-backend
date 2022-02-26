import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsModule } from 'src/bookings/bookings.module';
import { TimesheetController } from './timesheet.controller';
import { TimesheetRepository } from './timesheet.repository';
import { TimesheetService } from './timesheet.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([TimesheetRepository]),
    BookingsModule
  ],
  controllers: [TimesheetController],
  providers: [TimesheetService, BookingsModule],
  exports: [TimesheetService]
})
export class TimesheetModule {}
