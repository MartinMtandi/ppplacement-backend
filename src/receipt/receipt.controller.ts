import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProfilesService } from 'src/profiles/profiles.service';
import { GetCurrentUserId } from 'src/utils/decorators';
import { ReceiptDto } from './dto/receipt.dto';
import { Receipt } from './receipt.entity';
import { ReceiptService } from './receipt.service';

@ApiTags('Receipt')
@Controller('receipt')
export class ReceiptController {
    constructor(private receiptService: ReceiptService, private profileService: ProfilesService){}

    @Post()
    @ApiCreatedResponse({description: 'Sign for Receipt Docs'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async signReceipt(@GetCurrentUserId() userId: string, @Body() receiptDto: ReceiptDto) : Promise<Receipt>{
        const user = await this.profileService.getProfileById(userId);

        return this.receiptService.signReceipt(user, receiptDto);
    }
}
