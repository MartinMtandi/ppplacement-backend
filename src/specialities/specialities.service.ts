import { Injectable, NotFoundException } from '@nestjs/common';
import { SpecialityStatus } from './specialities-status.enum';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { SpecialitiesRepository } from './specialities.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Speciality } from './speciality.entity';

@Injectable()
export class SpecialitiesService {
    constructor(@InjectRepository(SpecialitiesRepository) private specialitiesRepository: SpecialitiesRepository){}

    getSpecialities(): Promise<Speciality[]> {
        return this.specialitiesRepository.query(`SELECT * FROM speciality`);
    }

    async getSpecialityById(id: string): Promise<Speciality> {
        try {
            const result = await this.specialitiesRepository.findOne(id);

            if(!result){
                throw new NotFoundException();
            }

            return result;
        } catch (error) {
            throw new NotFoundException("Speciality not found");
        }
        
    }

    createSpeciality(createSpecialityDto: CreateSpecialityDto): Promise<Speciality> {
        return this.specialitiesRepository.createSpeciality(createSpecialityDto);
    }

    async deleteSpeciality(id: string): Promise<void> {
        const result = await this.specialitiesRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException();
        }
    }

    async updateSpecialityStatus(id: string, status: SpecialityStatus): Promise<Speciality> {
        const speciality = await this.getSpecialityById(id);

        speciality.status = status;
        await this.specialitiesRepository.save(speciality); 

        return speciality;

    }
}
