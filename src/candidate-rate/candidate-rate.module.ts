import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { CandidateRateController } from './candidate-rate.controller';
import { CandidateRateService } from './candidate-rate.service';
import { CandidateRateRepository } from './candidate.rate.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CandidateRateRepository]),
    AuthModule,
    ProfilesModule
  ],
  controllers: [CandidateRateController],
  providers: [CandidateRateService, ProfilesModule]
})
export class CandidateRateModule {}
