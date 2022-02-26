import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialitiesController } from './specialities.controller';
import { SpecialitiesRepository } from './specialities.repository';
import { SpecialitiesService } from './specialities.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([SpecialitiesRepository]),
  ],
  controllers: [SpecialitiesController],
  providers: [SpecialitiesService],
  exports: [SpecialitiesService]
})
export class SpecialitiesModule {}
