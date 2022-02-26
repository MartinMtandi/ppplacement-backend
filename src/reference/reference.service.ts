import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ExtendUpdateReferenceDto } from './dto/extend-update-reference.dto';
import { ReferenceDto } from './dto/reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { Reference } from './reference.entity';
import { ReferenceRepository } from './reference.repository';

@Injectable()
export class ReferenceService {
    constructor(@InjectRepository(ReferenceRepository) private referenceRepository: ReferenceRepository){}

    createReferences(referenceDto: ReferenceDto[], user: User) : Promise <void> {
        return this.referenceRepository.createReferences(referenceDto, user);
    }

    async updateUserReference(id: string, updateReferenceDto: UpdateReferenceDto) : Promise <void> {
        const result = await this.referenceRepository.findOne(id);

        if(!result){
            throw new NotFoundException();
        }

        let reference = new ExtendUpdateReferenceDto();
        reference = {id, ...updateReferenceDto};

        try {
            await this.referenceRepository.save(reference);

            return;
        } catch (error) {
            throw new InternalServerErrorException();
        }

    }
}
