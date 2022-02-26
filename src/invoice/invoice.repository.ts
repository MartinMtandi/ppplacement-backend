import { InternalServerErrorException } from "@nestjs/common";
import { Timesheet } from "src/timesheet/timesheet.entity";
import { EntityRepository, Repository } from "typeorm";
import { InvoiceDto } from "./dto/invoice.dto";
import { Invoice } from "./invoice.entity";

@EntityRepository(Invoice)
export class InvoiceRepository extends Repository <Invoice> {
    async createPayrollAndInvoice(invoiceDto: InvoiceDto, timesheet: Timesheet): Promise<Invoice>{
        const invoice = this.create({...invoiceDto, timesheet});

        try {
            await this.save(invoice);
            return invoice;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create invoice');
        }
    }
}