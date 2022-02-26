import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BusinessUnitModule } from 'src/business-unit/business-unit.module';
import { ClientModule } from 'src/client/client.module';
import { SpecialitiesModule } from 'src/specialities/specialities.module';
import { RatesController } from './rates.controller';
import { RatesRepository } from './rates.repository';
import { RatesService } from './rates.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([RatesRepository]),
    AuthModule,
    BusinessUnitModule,
    SpecialitiesModule
  ],
  controllers: [RatesController],
  providers: [RatesService, SpecialitiesModule, BusinessUnitModule]
})
export class RatesModule {}
