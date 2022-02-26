import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { BusinessUnitService } from 'src/business-unit/business-unit.service';
import { ClientService } from 'src/client/client.service';
import { InternalUsersService } from 'src/internal-users/internal-users.service';
import { ProfilesService } from 'src/profiles/profiles.service';
import { SpecialitiesService } from 'src/specialities/specialities.service';
import { GetCurrentUserId } from 'src/utils/decorators';
import { VacanciesDto } from './dto/vacancies.dto';
import { Vacancies } from './vacancies.entity';
import { VacanciesService } from './vacancies.service';

@ApiTags("Vacancies")
@Controller('vacancies')
export class VacanciesController {
    constructor(
        private vacanciesService: VacanciesService,
        private clientService: ClientService,
        private businessUnitService: BusinessUnitService,
        private specialitiesService: SpecialitiesService,
        private internalUserService: InternalUsersService,
        private profilesService: ProfilesService
    ){}

    @Get('/dashboard')
    @ApiOkResponse({description: 'Get All Vacancies'})
    async getAllVacancies(@Req() req: Request) {
        const builder = await this.vacanciesService.getAllVacancies('vacancies');

        builder.leftJoinAndSelect('vacancies.client', 'client');
        builder.leftJoinAndSelect('vacancies.businessUnit', 'businessUnit');
        builder.leftJoinAndSelect('vacancies.speciality', 'speciality');
        builder.leftJoinAndSelect('vacancies.createdBy', 'createdBy');
        builder.orderBy('vacancies.createdAt', 'DESC');

        const page: number = parseInt(req.query.page as any) || 1;
        const perPage: number = parseInt(req.query.perPage as any) || 10;
        const total = await builder.getCount();

        builder.offset((page - 1) * perPage).limit(perPage);

        return {
            data: await builder.getMany(),
            total,
            page,
            perPage,
            last_page: Math.ceil(total / perPage)
        }
    }

    @Get('/candidate')
    @ApiOkResponse({description: 'Get vacancies for candidates'})
    async getCandidateVacancies(
        @Req() req: Request,
        @GetCurrentUserId() userId: string,
    ) {
        const user = await this.profilesService.getProfileById(userId);

        const builder = await this.vacanciesService.getAllVacancies('vacancies');

        builder.leftJoinAndSelect('vacancies.client', 'client');
        builder.leftJoinAndSelect('vacancies.businessUnit', 'businessUnit');
        builder.leftJoinAndSelect('vacancies.createdBy', 'createdBy');
        builder.leftJoinAndSelect('vacancies.speciality', 'speciality');
        builder.where('vacancies.speciality = :speciality', {speciality: user.speciality.id});
        builder.orderBy('vacancies.createdAt', 'DESC');
     
        const page: number = parseInt(req.query.page as any) || 1;
        const perPage: number = parseInt(req.query.perPage as any) || 10;
        const total = await builder.getCount();

        builder.offset((page - 1) * perPage).limit(perPage);

        return {
            data: await builder.getMany(),
            total,
            page,
            perPage,
            last_page: Math.ceil(total / perPage)
        }

    }

    @Get('/:id')
    @ApiOkResponse({description: 'Get Vacancy By Id'})
    getVacancyById(@Param('id', ParseUUIDPipe) id: string) : Promise <Vacancies> {
        return this.vacanciesService.getVacancyById(id);
    }

    @Post()
    @ApiCreatedResponse({description: 'Created new vacancy'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async createVacancy(
        @GetCurrentUserId() userId: string,
        @Body() vacancyDto: VacanciesDto
    ) : Promise <Vacancies> {
        const createdBy = await this.internalUserService.getUserById(userId)
        const client = await this.clientService.getClientById(vacancyDto.clientId);
        const businessUnit = await this.businessUnitService.getBusinessUnitById(vacancyDto.businessUnitId);
        const speciality = await this.specialitiesService.getSpecialityById(vacancyDto.specialityId);

        return this.vacanciesService.createVacancy(vacancyDto, client, businessUnit, speciality, createdBy);
    }
}
