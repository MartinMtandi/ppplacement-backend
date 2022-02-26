import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CandidateAvailability } from "./candidate-availability.entity";
import { CandidateAvailabilityDto } from "./dto/candidate-availability.dto";

@EntityRepository(CandidateAvailability)
export class CandidateAvailabilityRepository extends Repository <CandidateAvailability> {
    async createCandidateAvailability(userId: string, candidateAvailabilityDto: CandidateAvailabilityDto) : Promise <void> {
        let date = new Date(candidateAvailabilityDto.shiftDate);
        const availability = await this.findOne({
            where: {
                candidateId: userId,
                shiftDate: date
            }
        });
       
        if(availability) {
            let payload = {id: availability.id, ...candidateAvailabilityDto}
           try {
               await this.save(payload);
               return;
           } catch (error) {
            throw new InternalServerErrorException('Failed to update candidate availability');
           }
        }

        const result = this.create({candidateId: userId, ...candidateAvailabilityDto});
        try {
            await this.save(result);
            return;
        } catch (error) {
            throw new InternalServerErrorException('Failed to update candidate availability');
        }
    }
}