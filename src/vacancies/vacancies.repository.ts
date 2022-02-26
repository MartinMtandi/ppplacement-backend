import { InternalServerErrorException } from "@nestjs/common";
import { BusinessUnit } from "src/business-unit/business-unit.entity";
import { Client } from "src/client/client.entity";
import { InternalUser } from "src/internal-users/internal-users.entity";
import { Speciality } from "src/specialities/speciality.entity";
import { EntityRepository, Repository } from "typeorm";
import { VacanciesDto } from "./dto/vacancies.dto";
import { Vacancies } from "./vacancies.entity";

@EntityRepository(Vacancies)
export class VacanciesRepository extends Repository <Vacancies> {
    async createVacancy(vacancyDto: VacanciesDto, client: Client, businessUnit: BusinessUnit, speciality: Speciality, createdBy: InternalUser) : Promise <Vacancies> {
        const vacancy = this.create({...vacancyDto, client, businessUnit, speciality, createdBy});

        try {
            await this.save(vacancy);
            return vacancy;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Failed to create a vacancy');
        }
    }
}