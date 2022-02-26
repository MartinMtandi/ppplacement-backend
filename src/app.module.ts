import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { SpecialitiesModule } from './specialities/specialities.module';
import { ProfilesModule } from './profiles/profiles.module';
import { NextofkinsModule } from './nextofkins/nextofkins.module';
import { TrainingsModule } from './trainings/trainings.module';
import { SkillsetModule } from './skillset/skillset.module';
import { AssessmentModule } from './assessment/assessment.module';
import { ComplianceModule } from './compliance/compliance.module';
import { ReferenceModule } from './reference/reference.module';
import { ClientModule } from './client/client.module';
import { InternalUsersModule } from './internal-users/internal-users.module';
import { configValidationSchema } from './config.schema';
import { RatesModule } from './rates/rates.module';
import { BusinessUnitModule } from './business-unit/business-unit.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { BookingsModule } from './bookings/bookings.module';
import { TimesheetModule } from './timesheet/timesheet.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CandidateRateModule } from './candidate-rate/candidate-rate.module';
import { TrainingChargesModule } from './training-charges/training-charges.module';
import { TransportDeductionsModule } from './transport-deductions/transport-deductions.module';
import { CandidateAvailabilityModule } from './candidate-availability/candidate-availability.module';
import { ContractModule } from './contract/contract.module';
import { ReceiptModule } from './receipt/receipt.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'fileStorage'),
      exclude: ['/api*'],
      renderPath: '/',
    }),
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = ['prod', 'staging'].includes(configService.get('STAGE'));
        return {
            ssl: isProduction,
            extra: {
              ssl: isProduction ? { rejectUnauthorized: false } : null,
            },
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            autoLoadEntities: true,
            synchronize: true,
            logging: false
        }
      },
    }),
    AuthModule,
    SpecialitiesModule,
    ProfilesModule,
    NextofkinsModule,
    TrainingsModule,
    SkillsetModule,
    AssessmentModule,
    ComplianceModule,
    ReferenceModule,
    ClientModule,
    InternalUsersModule,
    RatesModule,
    BusinessUnitModule,
    VacanciesModule,
    BookingsModule,
    TimesheetModule,
    InvoiceModule,
    CandidateRateModule,
    TrainingChargesModule,
    TransportDeductionsModule,
    CandidateAvailabilityModule,
    ContractModule,
    ReceiptModule,
  ],
  providers: [],
})
export class AppModule {}
