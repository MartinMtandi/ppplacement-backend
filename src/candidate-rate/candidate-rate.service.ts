import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CandidateRate } from './candidate-rate.entity';
import { CandidateRateDto } from './dto/candidate.rate.dto';
import { CandidateRateRepository } from './candidate.rate.repository';
import { UpdateCandidateBillingRateDto } from './dto/updateCandidateBillingRate.dto';

@Injectable()
export class CandidateRateService {
    constructor(@InjectRepository(CandidateRateRepository) private candidateRateRepository: CandidateRateRepository){}

    async addCandidateBillingRates(candidateBillingRateDto: CandidateRateDto, candidate: User): Promise<CandidateRate> {
        return this.candidateRateRepository.addCandidateBillingRates(candidateBillingRateDto, candidate);
    }

    async getCandidateRateById(id: string) : Promise <CandidateRate> {
        try {
            const result = await this.candidateRateRepository.findOne(id);

            if(!result){
                throw new NotFoundException();
            }

            return result;
        } catch (error) {
            throw new NotFoundException("Candidate not found");
        }
    }

    async updateCandidateBillingRate(id: string, updateCandidateBillingRateDto: UpdateCandidateBillingRateDto) : Promise<void> {
        const result = await this.candidateRateRepository.findOne(id);

        if(!result){
            throw new NotFoundException();
        }

        let billing = {id, updateCandidateBillingRateDto};

        try {
            await this.candidateRateRepository.save(billing);
            return;
        } catch (error) {
            throw new InternalServerErrorException();
        }

    }
}
