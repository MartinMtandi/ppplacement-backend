import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ClientModule } from 'src/client/client.module';
import { BusinessUnitController } from './business-unit.controller';
import { BusinessUnitRepository } from './business-unit.repository';
import { BusinessUnitService } from './business-unit.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([BusinessUnitRepository]),
    AuthModule,
    ClientModule
  ],
  controllers: [BusinessUnitController],
  providers: [BusinessUnitService, ClientModule],
  exports: [BusinessUnitService]
})
export class BusinessUnitModule {}
