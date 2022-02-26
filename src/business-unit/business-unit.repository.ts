import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { BusinessUnit } from "./business-unit.entity";
import { BusinessUnitDto } from "./dto/business-unit.dto";

@EntityRepository(BusinessUnit)
export class BusinessUnitRepository extends Repository <BusinessUnit> {
    async createBusinessUnit(businessUnitDto: BusinessUnitDto, client) : Promise <BusinessUnit> {
        const result = this.create({...businessUnitDto, client});

        try {
            await this.save(result);
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create new business unit');
        }
    }
}