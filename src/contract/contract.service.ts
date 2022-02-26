import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Contract } from './contract.entity';
import { ContractRepository } from './contract.repository';
import { ContractDto } from './dto/contract.dto';

@Injectable()
export class ContractService {
    constructor(@InjectRepository(ContractRepository) private contractRepository: ContractRepository){}

    async createContract(user: User, contractDto: ContractDto): Promise<Contract>{
        return this.contractRepository.createContract(user, contractDto);
    }

    async getCandidateContractSignatures(user: User) : Promise <Contract> {
        try {
           return await this.contractRepository.findOne({
               where: {
                   candidate: user,
               }
           });
        } catch (error) {
            throw new NotFoundException("Contract not found");
        }
    }
}
