import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { NextofkinsController } from './nextofkins.controller';
import { NextofkinRepository } from './nextofkins.repository';
import { NextofkinsService } from './nextofkins.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([NextofkinRepository]),
    ProfilesModule,
    AuthModule
  ],
  controllers: [NextofkinsController],
  providers: [NextofkinsService, ProfilesModule]
})
export class NextofkinsModule {}
