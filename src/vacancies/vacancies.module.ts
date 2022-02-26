import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BusinessUnitModule } from 'src/business-unit/business-unit.module';
import { ClientModule } from 'src/client/client.module';
import { InternalUsersModule } from 'src/internal-users/internal-users.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { SpecialitiesModule } from 'src/specialities/specialities.module';
import { VacanciesController } from './vacancies.controller';
import { VacanciesRepository } from './vacancies.repository';
import { VacanciesService } from './vacancies.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([VacanciesRepository]),
    AuthModule,
    ClientModule,
    SpecialitiesModule,
    BusinessUnitModule,
    ProfilesModule,
    InternalUsersModule
  ],
  controllers: [VacanciesController],
  providers: [VacanciesService, ClientModule, SpecialitiesModule, BusinessUnitModule, InternalUsersModule, ProfilesModule, AuthModule], 
  exports: [VacanciesService]
})
export class VacanciesModule {}
