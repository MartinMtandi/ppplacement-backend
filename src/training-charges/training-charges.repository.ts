import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { TrainingChargesDto } from "./dto/training-charges.dto";
import { TrainingCharges } from "./training-charges.entity";

@EntityRepository(TrainingCharges)
export class TrainingChargesRepository extends Repository <TrainingCharges> {
    async createTrainingCharges(trainingChargesDto: TrainingChargesDto) : Promise <TrainingCharges> {
        const result = this.create(trainingChargesDto);

        try {
            await this.save(result);
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create training charges');
        }
    }
}   