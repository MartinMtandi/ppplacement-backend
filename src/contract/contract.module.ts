import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ContractController } from './contract.controller';
import { ContractRepository } from './contract.repository';
import { ContractService } from './contract.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractRepository]),
    ProfilesModule
  ],
  controllers: [ContractController],
  providers: [ContractService, ProfilesModule]
})
export class ContractModule {}
