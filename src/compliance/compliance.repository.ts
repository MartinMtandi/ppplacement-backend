import { InternalServerErrorException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Compliance } from "./compliance.entity";
import { ComplianceDto } from "./dto/compliance.dto";
require('dotenv').config();

@EntityRepository(Compliance)
export class ComplianceRepository extends Repository <Compliance> {
    handleExpiryDate(date) {
        var d = new Date(date);
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        var c = new Date(year + 1, month, day);
        return c;
    }

    async uploadComplianceDocuments(user: User, uploadComplianceDocumentsDto: ComplianceDto, files: any) : Promise <Compliance> {
        const {dbsIssueDate} = uploadComplianceDocumentsDto;
        const dbsExpiry = this.handleExpiryDate(dbsIssueDate);
        const baseURL = process.env.BASE_URL;
      
        let result = this.create({
            user, 
            ...uploadComplianceDocumentsDto, 
            dbsExpiry,
            resume:  files.resume ? baseURL + '/' + files.resume[0].path : null, 
            rightToWork:  files.rightToWork ? baseURL + '/' + files.rightToWork[0].path : null,  
            bankingDetails: files.bankingDetails ? baseURL + '/' + files.bankingDetails[0].path : null,  
            proofOfIdentity: files.proofOfIdentity ? baseURL + '/' + files.proofOfIdentity[0].path : null, 
            indemnityInsurance : files.indemnityInsurance ? baseURL + '/' + files.indemnityInsurance[0].path : null,  
            qualifications: files.qualifications ? baseURL + '/' + files.qualifications[0].path : null,  
            proofOfAddress: files.proofOfAddress ? baseURL + '/' + files.proofOfAddress[0].path : null, 
            dbsCertification: files.dbsCertification ? baseURL + '/' + files.dbsCertification[0].path : null, 
            profilePicture: files.profilePicture ? baseURL + '/' + files.profilePicture[0].path : null, 
        });
       
        try {
            
            await this.save(result); 
            return result;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}