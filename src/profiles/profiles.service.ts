import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplianceCheckStatus, User } from 'src/auth/user.entity';
import { UserAvailabilityDto } from './dto/availality.dto';
import { ProfileComplianceStatusDto } from './dto/compliance.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfileDto } from './dto/user-profile.dto';
import { ProfilesRepository } from './profiles.repository';

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(ProfilesRepository) private profilesRepository: ProfilesRepository) {}

    getAllProfiles(): Promise<User[]>{ 
        return this.profilesRepository.find();
    }

    async getProfileById(id: string): Promise<User> {
        const result  = await this.profilesRepository.findOne(id);

        if(!result){
            throw new NotFoundException();
        }

        return result;
    }
    
    async updateProfileById(id: string, userProfileDto: UserProfileDto): Promise<void> {
        await this.getProfileById(id);
      
        let user = new UpdateUserProfileDto();
        user = {id, isSubmitted: true, ...userProfileDto};
           
        await this.profilesRepository.save(user);

        return;
    }

    async updateProfileComplianceStatus(id: string, complianceCheckStatus: ProfileComplianceStatusDto): Promise<void>{
        await this.getProfileById(id);

        let profile = {id, ...complianceCheckStatus};

        try {
            await this.profilesRepository.save(profile);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async updateUserAvailability(id: string, userAvailablityDto: UserAvailabilityDto) : Promise <void> {
        let user = {id, ...userAvailablityDto};

        try {
            await this.profilesRepository.save(user);
            return
        } catch (error) {
           throw new InternalServerErrorException(); 
        }
    }
}
