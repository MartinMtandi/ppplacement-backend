import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidateAvailability } from './candidate-availability.entity';
import { CandidateAvailabilityRepository } from './candidate-availability.repository';
import { CandidateAvailabilityDto } from './dto/candidate-availability.dto';

@Injectable()
export class CandidateAvailabilityService {
    constructor(@InjectRepository(CandidateAvailabilityRepository) private candidateAvailabilityRepository: CandidateAvailabilityRepository){}

    createCandidateAvailability(userId: string, candidateAvailabilityDto: CandidateAvailabilityDto): Promise <void> {
        return this.candidateAvailabilityRepository.createCandidateAvailability(userId, candidateAvailabilityDto);
        
    } 
    
    async getCandidateAvailabilityById(id: string) : Promise <CandidateAvailability[]> {
        const result = await this.candidateAvailabilityRepository.find({
            where: {
                candidateId: id,
            }
        });

        if(!result){
            return [];
        }

        return result;
    }
}
