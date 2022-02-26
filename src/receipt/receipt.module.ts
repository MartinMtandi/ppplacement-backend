import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { ReceiptController } from './receipt.controller';
import { ReceiptRepository } from './receipt.repository';
import { ReceiptService } from './receipt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceiptRepository]),
    ProfilesModule
  ],
  controllers: [ReceiptController],
  providers: [ReceiptService, ProfilesModule]
})
export class ReceiptModule {}
