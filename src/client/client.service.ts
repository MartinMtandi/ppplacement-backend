import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalUser } from 'src/internal-users/internal-users.entity';
import { Client } from './client.entity';
import { ClientRepository } from './client.repository';
import { ClientDto } from './dto/client.dto';

@Injectable()
export class ClientService {
    constructor(@InjectRepository(ClientRepository) private clientRepository: ClientRepository){}

    getAllClients() : Promise <Client[]> {
        return this.clientRepository.find();
    }
    
    async getClientById(id: string) : Promise <Client> {
        try {
            const result = await this.clientRepository.findOne(id);

            if(!result){
                throw new NotFoundException("Client not found");
            }

            return result;
        } catch (error) {
            throw new NotFoundException("Client not found");
        }
        
    }

    async createClient(clientDto: ClientDto, admin: InternalUser) : Promise <Client> {
        return this.clientRepository.createClient(clientDto, admin);
    }

    async updateClient(id: string, clientDto: ClientDto) : Promise <void> {
        const result = await this.clientRepository.findOne(id);

        if(!result){
            throw new NotFoundException();
        }

        try {
            await this.clientRepository.save({id, ...clientDto});
        } catch (error) {
            throw new InternalServerErrorException('Failed to update client record');
        }
    }
}
