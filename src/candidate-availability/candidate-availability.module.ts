import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateAvailabilityController } from './candidate-availability.controller';
import { CandidateAvailabilityRepository } from './candidate-availability.repository';
import { CandidateAvailabilityService } from './candidate-availability.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CandidateAvailabilityRepository]),
  ],
  controllers: [CandidateAvailabilityController],
  providers: [CandidateAvailabilityService]
})
export class CandidateAvailabilityModule {}
