import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { TimesheetModule } from 'src/timesheet/timesheet.module';
import { InvoiceController } from './invoice.controller';
import { InvoiceRepository } from './invoice.repository';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceRepository]),
    TimesheetModule,
    ProfilesModule
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, TimesheetModule, ProfilesModule]
})
export class InvoiceModule {}
