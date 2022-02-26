import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Assessment } from './assessment.entity';
import { AssessmentRepository } from './assessment.repository';
import { AssessmentDto } from './dto/assessment.dto';
import { ExtendUpdateAssessmentDto } from './dto/extend-update-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@Injectable()
export class AssessmentService {
    constructor(@InjectRepository(AssessmentRepository) private assessmentRepository: AssessmentRepository){}

    createUserAssessment(assessmentDto: AssessmentDto, user: User) : Promise <Assessment> {
        return this.assessmentRepository.createUserAssessment(assessmentDto, user);
    }

    async updateUserAssessment(id: string, updateUserAssessment: UpdateAssessmentDto) : Promise <void> {
        const result = await this.assessmentRepository.findOne(id);

        if(!result){
            throw new NotFoundException();
        }

        let assessment = new ExtendUpdateAssessmentDto();
        assessment = {id, ...updateUserAssessment};

        try {
            await this.assessmentRepository.save(assessment);
            return;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
