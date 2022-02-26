import { InternalServerErrorException } from "@nestjs/common";
import { InternalUser } from "src/internal-users/internal-users.entity";
import { EntityRepository, Repository } from "typeorm";
import { Client } from "./client.entity";
import { ClientDto } from "./dto/client.dto";

@EntityRepository(Client)
export class ClientRepository extends Repository <Client> {
    async createClient(clientDto: ClientDto, admin: InternalUser) : Promise <Client> {
        const createdBy = `${admin.firstname + " " + admin.lastname}`;
        const client = this.create({...clientDto, createdBy});
        try {
            await this.save(client);
            return client;
        } catch (error) {
            throw new InternalServerErrorException('Failed to create a client');
        }
    }
}