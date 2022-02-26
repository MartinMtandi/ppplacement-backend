import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ComplianceController } from './compliance.controller';
import { ComplianceRepository } from './compliance.repository';
import { ComplianceService } from './compliance.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ComplianceRepository]),
    ProfilesModule, 
    AuthModule
  ],
  controllers: [ComplianceController],
  providers: [ComplianceService, ProfilesModule]
})
export class ComplianceModule {}
