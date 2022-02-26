import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { TransportDeductionsDto } from "./dto/transport-deductions.dto";
import { TransportDeductions } from "./transport-deductions.entity";

@EntityRepository(TransportDeductions)
export class TransportDeductionsRepository extends Repository <TransportDeductions> {
    async createTransportDeductions(transportDeductionsDto: TransportDeductionsDto) : Promise <TransportDeductions> {
        const result = this.create(transportDeductionsDto);

        try {
            await this.save(result);
            return result; 
        } catch (error) {
            throw new InternalServerErrorException('Failed to create transport deductions');
        }
    }
}