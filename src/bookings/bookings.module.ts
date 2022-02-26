import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { InternalUsersModule } from '../internal-users/internal-users.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { VacanciesModule } from '../vacancies/vacancies.module';
import { VacanciesRepository } from 'src/vacancies/vacancies.repository';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { BookingsService } from './bookings.service';
import { ClientModule } from '../client/client.module';
import { BusinessUnitModule } from 'src/business-unit/business-unit.module';
import { SpecialitiesModule } from 'src/specialities/specialities.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([BookingsRepository, VacanciesRepository]),
    ProfilesModule,
    VacanciesModule,
    BookingsModule,
    InternalUsersModule,
    ClientModule,
    BusinessUnitModule,
    SpecialitiesModule,
    AuthModule
  ],
  controllers: [BookingsController],
  providers: [
    BookingsService, 
    VacanciesModule, 
    ProfilesModule, 
    AuthModule,
    InternalUsersModule,
    SpecialitiesModule,
    ClientModule,
    BusinessUnitModule,
  ],
  exports: [BookingsService]
})
export class BookingsModule {}
