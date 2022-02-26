import { InternalServerErrorException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { NextOfKinDto } from "./dto/next-of-kin.dto";
import { Nextofkin } from "./nextofkin.entity";

@EntityRepository(Nextofkin)
export class NextofkinRepository extends Repository <Nextofkin>{
    async createNextofkin(nextofkinDto: NextOfKinDto, user: User) : Promise<Nextofkin>{
        
        const nok = this.create({...nextofkinDto, user});

        try {
            await this.save(nok);
            return nok;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create the next of kin record');
        }
    }
}