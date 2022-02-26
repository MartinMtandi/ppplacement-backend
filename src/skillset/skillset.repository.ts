import { InternalServerErrorException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { SkillsetDto } from "./dto/skill-set.dto";
import { SkillSet } from "./skillset.entity";

@EntityRepository(SkillSet)
export class SkillSetRepository extends Repository <SkillSet> {
    async createUserSkillset(skillsetDto: SkillsetDto, user: User) : Promise <SkillSet> {
        const result = this.create({...skillsetDto, user});
        try {
            await this.save(result);
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create the next of kin record');
        }
    }
}