import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ReferenceController } from './reference.controller';
import { ReferenceRepository } from './reference.repository';
import { ReferenceService } from './reference.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([ReferenceRepository]),
    ProfilesModule,
    AuthModule
  ],
  controllers: [ReferenceController],
  providers: [ReferenceService, ProfilesModule]
})
export class ReferenceModule {}
