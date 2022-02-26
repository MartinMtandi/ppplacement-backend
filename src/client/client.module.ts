import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { InternalUsersModule } from 'src/internal-users/internal-users.module';
import { ClientController } from './client.controller';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([ClientRepository]),
    AuthModule,
    InternalUsersModule
  ],
  controllers: [ClientController],
  providers: [ClientService, InternalUsersModule],
  exports: [ClientService]
})
export class ClientModule {}
