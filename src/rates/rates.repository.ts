import { InternalServerErrorException } from "@nestjs/common";
import { BusinessUnit } from "src/business-unit/business-unit.entity";
import { Speciality } from "src/specialities/speciality.entity";
import { EntityRepository, Repository } from "typeorm";
import { RatesDto } from "./dto/rates.dto";
import { Rates } from "./rates.entity";

@EntityRepository(Rates)
export class RatesRepository extends Repository <Rates> {
    async addRates(ratesDto: RatesDto, businessUnit: BusinessUnit, speciality: Speciality) : Promise <Rates> {
        const rates = this.create({...ratesDto, businessUnit, speciality});
        try {
            await this.save(rates);
            return rates;
        } catch (error) {
            throw new InternalServerErrorException('Failed to add rates');
        }
    }
}