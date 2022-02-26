import { InternalServerErrorException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { ReceiptDto } from "./dto/receipt.dto";
import { Receipt } from "./receipt.entity";

@EntityRepository(Receipt)
export class ReceiptRepository extends Repository <Receipt> {
    async signReceipt(user: User, receiptDto: ReceiptDto) : Promise<Receipt> {
        const receipt = this.create({candidate: user, ...receiptDto});

        try {
            await this.save(receipt);
            return receipt;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create receipt');
        }
    }
}