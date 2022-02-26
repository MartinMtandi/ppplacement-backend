import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { MandatoryTrainingsDto } from './dto/mandatory-trainings.dto';
import { TrainingsDto } from './dto/trainings.dto';
import { UpdateMandatoryTrainingDto } from './dto/update-mandatory-training.dto';
import { MandatoryTrainingRepository } from './mandatory-training.repository';
import { MandatoryTrainings } from './mandatory-trainings.entity';

@Injectable()
export class TrainingsService {
    constructor(@InjectRepository(MandatoryTrainingRepository) private mandatoryTrainingRepository: MandatoryTrainingRepository){}

    createMandatoryTraining(mandatoryTrainingDto: MandatoryTrainingsDto, user: User): Promise<MandatoryTrainings> {
        return this.mandatoryTrainingRepository.createMandatoryTraining(mandatoryTrainingDto, user);
    }

    async updateUserMandatoryTraining(id: string, updateMandatoryTrainingDto: UpdateMandatoryTrainingDto) : Promise<void> {
        const result = await this.mandatoryTrainingRepository.findOne(id);

        if(!result){
            throw new NotFoundException();
        }

        let training = new TrainingsDto();
        training = {id, ...updateMandatoryTrainingDto};

        try {
            await this.mandatoryTrainingRepository.save(training);
            return;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

}
