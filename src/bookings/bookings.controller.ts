import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BusinessUnitService } from 'src/business-unit/business-unit.service';
import { ClientService } from '../client/client.service';
import { InternalUsersService } from '../internal-users/internal-users.service';
import { ProfilesService } from '../profiles/profiles.service';
import { SpecialitiesService } from '../specialities/specialities.service';
import { GetCurrentUserId } from '../utils/decorators';
import { VacanciesService } from '../vacancies/vacancies.service';
import { Bookings } from './bookings.entity';
import { BookingsService } from './bookings.service';
import { BookingsDto } from './dto/bookings.dto';
import { BookingsExtendedDto } from './dto/bookings.extended.dto';
import { CustomBookingDto } from './dto/custom.booking.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
    constructor(
        private bookingService: BookingsService, 
        private candidateService: ProfilesService, 
        private vacancyService: VacanciesService,
        private internalUserService: InternalUsersService,
        private clientService: ClientService,
        private businessUnitService: BusinessUnitService, 
        private specialitiesService: SpecialitiesService
        ){}

    @Get('dashboard')
    @ApiOkResponse({description: 'Get All Bookings By Admin'})
    async getAllBookings(): Promise <Bookings[]>{
        return this.bookingService.getAllBookings();
        // const builder = await this.bookingService.getAllBookings('bookings');

        // builder.leftJoinAndSelect('bookings.candidate', 'candidates');
        // builder.leftJoinAndSelect('bookings.vacancy', 'vacancy');
        // builder.orderBy('bookings.createdAt', 'DESC');

        // const page: number = parseInt(req.query.page as any) || 1;
        // const perPage: number = parseInt(req.query.perPage as any) || 10;
        // const total = await builder.getCount();

        // builder.offset((page - 1) * perPage).limit(perPage);

        // return {
        //     data: await builder.getMany(),
        //     total,
        //     page,
        //     perPage,
        //     last_page: Math.ceil(total / perPage)
        // }
    }

    @Get('candidate')
    @ApiOkResponse({description: 'Get All Bookings By Candidate'})
    async getCandidateBookings(
        @GetCurrentUserId() userId: string,
    ) {
        const user = await this.candidateService.getProfileById(userId);
        return this.bookingService.getCandidateBookings(user);
        // const builder = await this.bookingService.getAllBookings('bookings');
     
        // builder.leftJoinAndSelect('bookings.candidate', 'candidates');
        // builder.leftJoinAndSelect('bookings.vacancy', 'vacancy');
        // builder.where('bookings.candidate = :candidate', {candidate: user.id});
        // builder.orderBy('bookings.createdAt', 'DESC');

        // const page: number = parseInt(req.query.page as any) || 1;
        // const perPage: number = parseInt(req.query.perPage as any) || 10;
        // const total = await builder.getCount();

        // builder.offset((page - 1) * perPage).limit(perPage);

        // return {
        //     data: await builder.getMany(),
        //     total,
        //     page,
        //     perPage,
        //     last_page: Math.ceil(total / perPage)
        // }
    }

    @Get('/:id')
    @ApiOkResponse({description: 'Get Booking By Id'})
    @ApiBadRequestResponse({description: 'Booking Not Found'})
    getBookingById(@Param('id', ParseUUIDPipe) id: string) : Promise<Bookings> {
        return this.bookingService.getBookingById(id);
    }

    @Post()
    @ApiCreatedResponse({description: 'Added a booking'})
    async createBooking(@Body() bookingDto: BookingsDto) : Promise <Bookings> {
        const candidate = await this.candidateService.getProfileById(bookingDto.candidateId);
        const vacancy = await this.vacancyService.getVacancyById(bookingDto.vacancyId);

        return this.bookingService.createBooking(candidate, vacancy);
    }

    @Post('/pre-book')
    @ApiCreatedResponse({description: 'Added a pre-booking'})
    async createPrebooking(@Body() prebookingDto: CustomBookingDto, @GetCurrentUserId() userId: string,) : Promise <any> {
        const candidate = await this.candidateService.getProfileById(prebookingDto.candidateId);
        const createdBy = await this.internalUserService.getUserById(userId);
        const client = await this.clientService.getClientById(prebookingDto.clientId);
        const businessUnit = await this.businessUnitService.getBusinessUnitById(prebookingDto.businessUnitId);
        const speciality = await this.specialitiesService.getSpecialityById(prebookingDto.specialityId);
        const vacancy = await this.vacancyService.createVacancy(prebookingDto, client, businessUnit, speciality, createdBy);
        return this.bookingService.createPrebooking(candidate, vacancy);
    }

    @Patch('/:id/status')
    @ApiOkResponse({description: 'Updated Booking'})
    @ApiBadRequestResponse({description: 'Booking Not Found'})
    updateBookingStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateBookingStatusDto: BookingsExtendedDto,
    ): Promise <Bookings>{
        const {status} = updateBookingStatusDto;
        return this.bookingService.updateBookingStatus(id, status);
    }
}
