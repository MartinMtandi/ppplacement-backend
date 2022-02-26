import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainingChargesDto } from './dto/training-charges.dto';
import { TrainingCharges } from './training-charges.entity';
import { TrainingChargesRepository } from './training-charges.repository';

@Injectable()
export class TrainingChargesService {
    constructor(@InjectRepository(TrainingChargesRepository) private trainingChargesRepository: TrainingChargesRepository) {}

    getTrainingCharges(): Promise<TrainingCharges[]> {
        return this.trainingChargesRepository.find();
    }

    async createTrainingCharges(trainingChargesDto: TrainingChargesDto) : Promise <TrainingCharges> {
        return this.trainingChargesRepository.createTrainingCharges(trainingChargesDto);
    }

    async deleteTrainingCharge(id: string) : Promise <void> {
        const result = await this.trainingChargesRepository.delete(id);
    }
}
