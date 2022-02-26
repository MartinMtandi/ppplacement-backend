import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Speciality } from "src/specialities/speciality.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto, speciality: Speciality) : Promise<User>{
        const { email, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user  = this.create({email, password: hashedPassword, speciality});
        try {
            await this.save(user); 
            return user;
        } catch (error) {
           if(error.code === '23505'){// duplicate email
               throw new ConflictException('This user already exists');
           } else {
                throw new InternalServerErrorException();
           }
        }
    }
}