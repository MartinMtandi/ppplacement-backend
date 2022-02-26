import { InternalServerErrorException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { MandatoryTrainingsDto } from "./dto/mandatory-trainings.dto";
import { MandatoryTrainings } from "./mandatory-trainings.entity";

@EntityRepository(MandatoryTrainings)
export class MandatoryTrainingRepository extends Repository <MandatoryTrainings> {
    async createMandatoryTraining(mandatoryTrainingDto: MandatoryTrainingsDto, user: User) : Promise<MandatoryTrainings> {
        const training = this.create({...mandatoryTrainingDto, user});
        try {
            await this.save(training);
            return training;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create mandatory training');
        }
    }
}