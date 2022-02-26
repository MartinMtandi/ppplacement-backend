import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';
import { SpecialitiesModule } from 'src/specialities/specialities.module';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    JwtModule.register({ }),
    SpecialitiesModule
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, SpecialitiesModule],
  controllers: [AuthController],
})
export class AuthModule {}
