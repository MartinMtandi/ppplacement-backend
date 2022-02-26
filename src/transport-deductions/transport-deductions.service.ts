import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransportDeductionsDto } from './dto/transport-deductions.dto';
import { TransportDeductions } from './transport-deductions.entity';
import { TransportDeductionsRepository } from './transport-deductions.repository';

@Injectable()
export class TransportDeductionsService {
    constructor(@InjectRepository(TransportDeductionsRepository) private transportDeductionsRepository: TransportDeductionsRepository){}
    
    getTransportDeductions(): Promise <TransportDeductions[]> {
        return this.transportDeductionsRepository.find();
    }

    async createTransportDeductions(transportDeductionsDto: TransportDeductionsDto): Promise<TransportDeductions> {
        return this.transportDeductionsRepository.createTransportDeductions(transportDeductionsDto);
    }

    async deleteTransportDeductions(id: string) : Promise <void> {
        const result = await this.transportDeductionsRepository.delete(id);
    }
}
