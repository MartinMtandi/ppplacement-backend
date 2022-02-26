import { CandidateRate } from "./candidate-rate.entity";
import { EntityRepository, Repository } from "typeorm";
import { CandidateRateDto } from "./dto/candidate.rate.dto";
import { User } from "src/auth/user.entity";
import { InternalServerErrorException } from "@nestjs/common";

@EntityRepository(CandidateRate)
export class CandidateRateRepository extends Repository <CandidateRate> {
    async addCandidateBillingRates(candidateBillingRateDto: CandidateRateDto, candidate: User): Promise<CandidateRate> {

        const billingRate = this.create({...candidateBillingRateDto, candidate});

        try {
            await this.save(billingRate);
            return billingRate;
        } catch (error) {
            throw new InternalServerErrorException('Failed to add billing rates');
        }
    }
}