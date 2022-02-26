import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { AssessmentController } from './assessment.controller';
import { AssessmentRepository } from './assessment.repository';
import { AssessmentService } from './assessment.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([AssessmentRepository]),
    ProfilesModule
  ],
  controllers: [AssessmentController],
  providers: [AssessmentService, ProfilesModule]
})
export class AssessmentModule {}
