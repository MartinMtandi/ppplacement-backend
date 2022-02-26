import { Body, Controller, Get, Param, ParseUUIDPipe, Post, StreamableFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from 'src/profiles/profiles.service';
import { multerOptions } from 'src/utils/config';
import { Compliance } from './compliance.entity';
import { ComplianceService } from './compliance.service';
import { ComplianceDto } from './dto/compliance.dto';
@ApiTags('Compliance (Upload Documents)')
@Controller('compliance')
export class ComplianceController {
    constructor(private complianceService: ComplianceService, private profileService: ProfilesService){}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'resume', maxCount: 1},
        {name: 'rightToWork', maxCount: 1},
        {name: 'bankingDetails', maxCount: 1},
        {name: 'proofOfIdentity', maxCount: 1},
        {name: 'indemnityInsurance', maxCount: 1},
        {name: 'qualifications', maxCount: 5},
        {name: 'proofOfAddress', maxCount: 1},
        {name: 'dbsCertification', maxCount: 1},
        {name: 'profilePicture', maxCount: 1},
    ], multerOptions))
    @ApiOkResponse({description: 'Upload Compliance Documents'})
    @ApiBadRequestResponse({description: 'Compliance Docs Found'})
    async uploadComplianceDocuments(
        @Body() uploadComplianceDocumentsDto: ComplianceDto,
        @UploadedFiles() files: {
            resume?: Express.Multer.File[],
            rightToWork?: Express.Multer.File[],
            bankingDetails?: Express.Multer.File[],
            proofOfIdentity?: Express.Multer.File[],
            indemnityInsurance?: Express.Multer.File[],
            qualifications?: Express.Multer.File[],
            proofOfAddress?: Express.Multer.File[],
            dbsCertification?: Express.Multer.File[],
            profilePicture?: Express.Multer.File[],
        }
    ) : Promise <Compliance> {
        const user = await this.profileService.getProfileById(uploadComplianceDocumentsDto.userId);
        return this.complianceService.uploadComplianceDocuments(user, uploadComplianceDocumentsDto, files);
    }

    @Get('/:id')
    getFiles(@Param('id', ParseUUIDPipe) id: string): any {
        return this.complianceService.getFiles(id);
    }

}