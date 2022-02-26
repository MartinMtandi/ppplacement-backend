import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ReceiptDto } from './dto/receipt.dto';
import { Receipt } from './receipt.entity';
import { ReceiptRepository } from './receipt.repository';

@Injectable()
export class ReceiptService {
    constructor(@InjectRepository(ReceiptRepository) private receiptRepository: ReceiptRepository) { }

    async signReceipt(user: User, receiptDto: ReceiptDto): Promise <Receipt> {
        return this.receiptRepository.signReceipt(user, receiptDto);
    }
}
