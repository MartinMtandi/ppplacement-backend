import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class ProfilesRepository extends Repository <User> {

}