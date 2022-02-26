import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProfilesService } from 'src/profiles/profiles.service';
import { TimesheetService } from 'src/timesheet/timesheet.service';
import { GetCurrentUserId } from 'src/utils/decorators';
import { InvoiceDto } from './dto/invoice.dto';
import { Invoice } from './invoice.entity';
import { InvoiceService } from './invoice.service';

@ApiTags('Invoices & Payroll')
@Controller('invoice')
export class InvoiceController {
    constructor(private invoiceService: InvoiceService, private timesheetService: TimesheetService, private profileService: ProfilesService){}

    @Get()
    @ApiOkResponse({description: 'Get Invoice & Payroll'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    getInvoiceAndPayroll() : Promise <Invoice[]> {
        return this.invoiceService.getInvoiceAndPayroll();
    }

    @Get('candidate-payroll')
    @ApiOkResponse({description: 'Get Payroll By Candidate'})
    async getCandidatePayroll(@GetCurrentUserId() userId: string): Promise <Invoice[]>{
        let user = await this.profileService.getProfileById(userId);
        return this.invoiceService.getCandidatePayroll(user);
    }

    @Post()
    @ApiCreatedResponse({description: 'Created payroll and invoice'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async createPayrollAndInvoice(@Body() invoiceDto: InvoiceDto) : Promise <Invoice> {
        const timesheet = await this.timesheetService.getTimesheetById(invoiceDto.timesheetId);

        return this.invoiceService.createPayrollAndInvoice(invoiceDto, timesheet);
    }
} 
