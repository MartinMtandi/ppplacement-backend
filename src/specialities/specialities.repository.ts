import { EntityRepository, Repository } from "typeorm";
import { CreateSpecialityDto } from "./dto/create-speciality.dto";
import { SpecialityStatus } from "./specialities-status.enum";
import { Speciality } from "./speciality.entity";

@EntityRepository(Speciality)
export class SpecialitiesRepository extends Repository <Speciality>{
    async createSpeciality(createSpecialityDto: CreateSpecialityDto) : Promise<Speciality> {
        const { title } = createSpecialityDto;

        const speciality = this.create({ 
            title, 
            status: SpecialityStatus.ACTIVE, 
        })

        await this.save(speciality);

        return speciality;
    }
}