import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { InternalUsersController } from './internal-users.controller';
import { InternalUserRepository } from './internal-users.repository';
import { InternalUsersService } from './internal-users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InternalUserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt'} ),
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h'
        }
      }),
  }),
  ],
  controllers: [InternalUsersController],
  providers: [InternalUsersService],
  exports: [InternalUsersService]
})
export class InternalUsersModule {}
