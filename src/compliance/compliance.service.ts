import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Compliance } from './compliance.entity';
import { ComplianceRepository } from './compliance.repository';
import { ComplianceDto } from './dto/compliance.dto';

@Injectable()
export class ComplianceService {
    constructor(@InjectRepository(ComplianceRepository) private complianceRepository: ComplianceRepository){}

    uploadComplianceDocuments(user: User, uploadComplianceDocumentsDto: ComplianceDto, files: any) : Promise <Compliance> {
        return this.complianceRepository.uploadComplianceDocuments(user, uploadComplianceDocumentsDto, files);
    }

    async getFiles(id: string) : Promise<any> {
        try {
            const result = await this.complianceRepository.findOne({
                where: { userId: id },
            });

            if(!result){
                throw new NotFoundException();
            }

        } catch (error) {
            throw new NotFoundException("Compliance documents not found");
        }
    }
}