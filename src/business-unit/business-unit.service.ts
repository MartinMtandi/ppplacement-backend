import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/client.entity';
import { BusinessUnit } from './business-unit.entity';
import { BusinessUnitRepository } from './business-unit.repository';
import { BusinessUnitDto } from './dto/business-unit.dto';
import { UpdateBusinessUnitDto } from './dto/update-business-unit.dto';

@Injectable()
export class BusinessUnitService {
    constructor(@InjectRepository(BusinessUnitRepository) private businessUnitRepository: BusinessUnitRepository){}

    createBusinessUnit(businessUnitDto: BusinessUnitDto, client: Client) : Promise <BusinessUnit> {
        return this.businessUnitRepository.createBusinessUnit(businessUnitDto, client);
    }

    async getBusinessUnitById(id: string) : Promise <BusinessUnit> {
        try {
            const result = await this.businessUnitRepository.findOne(id);

            if(!result){
                throw new NotFoundException("Business site not found");
            }

            return result;
        } catch (error) {
            throw new NotFoundException("Business site not found")
        }
        
    }

    async updateBusinessUnit(id: string, updateBusinessUnitDto: UpdateBusinessUnitDto) : Promise <void> {
        const result = await this.businessUnitRepository.findOne(id);

        if(!result){
            throw new NotFoundException();
        }

        let businessUnit = {id, ...updateBusinessUnitDto};

        try {
            await this.businessUnitRepository.save(businessUnit);
            return;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
