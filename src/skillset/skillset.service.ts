import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ExtendUpdateSkillSetDto } from './dto/extend-update-skill-set.dto';
import { SkillsetDto } from './dto/skill-set.dto';
import { UpdateSkillsetDto } from './dto/update-skill-set.dto';
import { SkillSet } from './skillset.entity';
import { SkillSetRepository } from './skillset.repository';

@Injectable()
export class SkillsetService {
    constructor(@InjectRepository(SkillSetRepository) private skillsetRepository: SkillSetRepository) {}

    createUserSkillset(skillsetDto: SkillsetDto, user: User) : Promise <SkillSet> {
        return this.skillsetRepository.createUserSkillset(skillsetDto, user);
    }

    async updateUserSkillSet(id: string, updateSkillSetDto: UpdateSkillsetDto) : Promise <void> {
        const result = await this.skillsetRepository.findOne(id);

        if(!result){
            throw new NotFoundException();
        }

        let userSkills = new ExtendUpdateSkillSetDto();
        userSkills = {id, ...updateSkillSetDto};

        try {
            await this.skillsetRepository.save(userSkills);
            return;   
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
