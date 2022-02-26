import { InternalServerErrorException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { Assessment } from "./assessment.entity";
import { AssessmentDto } from "./dto/assessment.dto";

@EntityRepository(Assessment)
export class AssessmentRepository extends Repository <Assessment> {
    async createUserAssessment(assessmentDto: AssessmentDto, user: User) : Promise <Assessment> {
        const result = this.create({...assessmentDto, user});

        try {
            await this.save(result);
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create user assessment record');
        }
    }
}