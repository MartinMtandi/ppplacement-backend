import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ExtendNextOfKinDto } from './dto/extend-next-of-kin.dto';
import { NextOfKinDto } from './dto/next-of-kin.dto';
import { UpdateNextOfKinDto } from './dto/update-nextofkin.dto';
import { Nextofkin } from './nextofkin.entity';
import { NextofkinRepository } from './nextofkins.repository';

@Injectable()
export class NextofkinsService {
    constructor(@InjectRepository(NextofkinRepository) private nextofkinRepository: NextofkinRepository){}

    createNextofkin(nextofkinDto: NextOfKinDto, user: User): Promise<Nextofkin> {
        return this.nextofkinRepository.createNextofkin(nextofkinDto, user);
    }

    async updateNextofkin(id: string, updateNextofkinDto: UpdateNextOfKinDto): Promise<void> {
        
        const result = await this.nextofkinRepository.findOne(id);

        if(!result){
            throw new NotFoundException();
        }

        let nextofkin = new ExtendNextOfKinDto();
        nextofkin = {id, ...updateNextofkinDto};

        try {
            await this.nextofkinRepository.save(nextofkin);
            return;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
