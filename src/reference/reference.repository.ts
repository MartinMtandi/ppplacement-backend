import { InternalServerErrorException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository, getConnection } from "typeorm";
import { ReferenceDto } from "./dto/reference.dto";
import { Reference } from "./reference.entity";

@EntityRepository(Reference)
export class ReferenceRepository extends Repository<Reference> {
    async createReferences(referenceDto: ReferenceDto[], user: User) : Promise <void> {
        try {
            referenceDto.forEach( async reference => {
                await getConnection().createQueryBuilder().insert().into(Reference).values({...reference, user}).execute();
            });
            return;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}