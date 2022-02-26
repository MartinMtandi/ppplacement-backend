import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { InternalUsersService } from 'src/internal-users/internal-users.service';
import { GetCurrentUserId } from 'src/utils/decorators';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';

@ApiTags('Client')
@Controller('client')
export class ClientController {
    constructor(private clientService: ClientService, private internalUserService: InternalUsersService){}

    @Get()
    @ApiOkResponse({description: 'Get all clients'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    getAllClients() : Promise <Client[]> {
        return this.clientService.getAllClients();
    }

    @Get('/:id')
    @ApiOkResponse({description: 'Get Client by id'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    getClientById(@Param('id', ParseUUIDPipe) id: string) : Promise <Client> {
        return this.clientService.getClientById(id);
    }

    @Post()
    @ApiCreatedResponse({description: 'Created new client'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async createClient(@Body() clientDto: ClientDto, @GetCurrentUserId() userId: string,) : Promise <Client> {
        const admin = await this.internalUserService.getUserById(userId);
        return this.clientService.createClient(clientDto, admin);
    }

    @Patch('/:id/user')
    @ApiOkResponse({description: 'Update client'})
    @ApiBadRequestResponse({description: 'Client not found'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    updateClient(@Param('id', ParseUUIDPipe) id: string, @Body() clientDto: ClientDto) : Promise <void> {
        return this.clientService.updateClient(id, clientDto);
    }
}
