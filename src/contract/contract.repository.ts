import { InternalServerErrorException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Contract } from "./contract.entity";
import { ContractDto } from "./dto/contract.dto";

@EntityRepository(Contract)
export class ContractRepository extends Repository <Contract> {
    async createContract(user: User, contractDto: ContractDto): Promise<Contract> {
        const contract = this.create({candidate: user, ...contractDto})
        try {
            await this.save(contract);
            return contract;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create contract');
        }
    }
}