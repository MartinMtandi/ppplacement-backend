import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Timesheet } from 'src/timesheet/timesheet.entity';
import { InvoiceDto } from './dto/invoice.dto';
import { Invoice } from './invoice.entity';
import { InvoiceRepository } from './invoice.repository';

@Injectable()
export class InvoiceService {
    constructor(@InjectRepository(InvoiceRepository) private invoiceRepository: InvoiceRepository){}

    getInvoiceAndPayroll(): Promise <Invoice[]> {
        return this.invoiceRepository.find();
    }

    async getCandidatePayroll(user: User): Promise <Invoice[]> {
        return this.invoiceRepository.find({
            relations: ["timesheet"],
            where: {
                timesheet: {
                    bookings: {
                        candidate: user
                    }
                }
            },
            order: {
                createdAt: "DESC"
            }            
        })
    }

    async createPayrollAndInvoice(invoiceDto: InvoiceDto, timesheet: Timesheet): Promise<Invoice>{
        return this.invoiceRepository.createPayrollAndInvoice(invoiceDto, timesheet);
    }
}
