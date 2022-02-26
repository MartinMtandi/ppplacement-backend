import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportDeductionsController } from './transport-deductions.controller';
import { TransportDeductionsRepository } from './transport-deductions.repository';
import { TransportDeductionsService } from './transport-deductions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransportDeductionsRepository]),
  ],
  controllers: [TransportDeductionsController],
  providers: [TransportDeductionsService]
})
export class TransportDeductionsModule {}
