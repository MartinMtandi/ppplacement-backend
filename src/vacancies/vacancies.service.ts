import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessUnit } from 'src/business-unit/business-unit.entity';
import { Client } from 'src/client/client.entity';
import { InternalUser } from 'src/internal-users/internal-users.entity';
import { Speciality } from 'src/specialities/speciality.entity';
import { VacanciesDto } from './dto/vacancies.dto';
import { Vacancies } from './vacancies.entity';
import { VacanciesRepository } from './vacancies.repository';

@Injectable()
export class VacanciesService {
    constructor(@InjectRepository(VacanciesRepository) private vacanciesRepository: VacanciesRepository){}

    async getAllVacancies(alias: string) {
        return this.vacanciesRepository.createQueryBuilder(alias);
    }

    async getVacancyById(id: string) : Promise <Vacancies> {
        const result = await this.vacanciesRepository.findOne(id);

        if(!result){
            throw new NotFoundException();
        }

        return result;
    }

    createVacancy(vacancyDto: VacanciesDto, client: Client, businessUnit: BusinessUnit, speciality: Speciality, agent: InternalUser ) : Promise <Vacancies> {
        return this.vacanciesRepository.createVacancy(vacancyDto, client, businessUnit, speciality, agent);
    }
}
