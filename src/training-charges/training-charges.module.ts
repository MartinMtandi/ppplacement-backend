import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingChargesController } from './training-charges.controller';
import { TrainingChargesRepository } from './training-charges.repository';
import { TrainingChargesService } from './training-charges.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingChargesRepository]),
  ],
  controllers: [TrainingChargesController],
  providers: [TrainingChargesService]
})
export class TrainingChargesModule {}
