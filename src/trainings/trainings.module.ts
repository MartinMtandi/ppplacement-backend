import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { MandatoryTrainingRepository } from './mandatory-training.repository';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MandatoryTrainingRepository]),
    ProfilesModule,
    AuthModule
  ],
  controllers: [TrainingsController],
  providers: [TrainingsService, ProfilesModule]
})
export class TrainingsModule {}
