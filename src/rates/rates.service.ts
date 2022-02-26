import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessUnit } from 'src/business-unit/business-unit.entity';
import { Speciality } from 'src/specialities/speciality.entity';
import { RatesDto } from './dto/rates.dto';
import { Rates } from './rates.entity';
import { RatesRepository } from './rates.repository';

@Injectable()
export class RatesService {
    constructor(@InjectRepository(RatesRepository) private ratesRepository: RatesRepository) {}

    getAllBillingRates() : Promise <Rates[]> {
        return this.ratesRepository.find();
    }

    async getBillingRatesById(id: string) : Promise <Rates> {
        const result = await this.ratesRepository.findOne(id);

        if(!result){
            throw new NotFoundException();
        }

        return result;
    }

    async addRates(ratesDto: RatesDto, businessUnit: BusinessUnit, speciality: Speciality): Promise <Rates> {
        return this.ratesRepository.addRates(ratesDto, businessUnit, speciality);
    }  
    
    async updateBillingRate(id: string, ratesDto: RatesDto) : Promise <void> {
        const result = await this.ratesRepository.findOne(id);

        if(!result){
            throw new NotFoundException();
        }

        try {
            await this.ratesRepository.save({id, ...ratesDto});
        } catch (error) {
            throw new InternalServerErrorException('Failed to update billing rates')
        }
    }
}
