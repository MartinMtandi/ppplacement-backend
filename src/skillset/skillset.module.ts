import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { SkillsetController } from './skillset.controller';
import { SkillSetRepository } from './skillset.repository';
import { SkillsetService } from './skillset.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([SkillSetRepository]),
    ProfilesModule,
    AuthModule
  ],
  controllers: [SkillsetController],
  providers: [SkillsetService, ProfilesModule]
})
export class SkillsetModule {}
