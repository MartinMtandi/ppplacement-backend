import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Vacancies } from 'src/vacancies/vacancies.entity';
import { Bookings, BookingStatus } from './bookings.entity';
import { BookingsRepository } from './bookings.repository';
import { CustomBookingDto } from './dto/custom.booking.dto';

@Injectable()
export class BookingsService {
    constructor(@InjectRepository(BookingsRepository) private bookingsRepository: BookingsRepository) {}

    async getAllBookings() : Promise <Bookings[]>{
        return this.bookingsRepository.find();
    }

    async getCandidateBookings(user: User) : Promise <Bookings[]> {
        try {
            const result = await this.bookingsRepository.find({where: {candidate: user}});
             if(!result){
                throw new NotFoundException("Candidate not found");
             }

             return result;
        } catch (error) {
            throw new InternalServerErrorException('Failed to get candidate bookings');
        }
    }

    async getBookingById(id: string) : Promise <Bookings> {
        try {
            const result = await this.bookingsRepository.findOne(id);

            if(!result){
                throw new NotFoundException();
            }

            return result;
        } catch (error) {
            throw new NotFoundException("Booking not found");
        }
    }

    async createBooking(candidate: User, vacancy: Vacancies) : Promise <Bookings>{
        const result = await this.bookingsRepository.findOne({candidate: candidate, vacancy: vacancy});

        if(result){
            throw new HttpException('Duplicate entries', HttpStatus.FORBIDDEN);
        }

        return this.bookingsRepository.createBooking(candidate, vacancy);
    }

    async createPrebooking(candidate: User, vacancy: Vacancies) : Promise <Bookings>{
        const result = await this.bookingsRepository.findOne({candidate: candidate, vacancy: vacancy});

        if(result){
            throw new HttpException('Duplicate entries', HttpStatus.FORBIDDEN);
        }

        return this.bookingsRepository.createPrebooking(candidate, vacancy);
    }

    async updateBookingStatus(id: string, status: BookingStatus) : Promise <Bookings> {
        const booking = await this.getBookingById(id);

        booking.status = status;
        await this.bookingsRepository.save(booking);

        return booking;
    }

}
