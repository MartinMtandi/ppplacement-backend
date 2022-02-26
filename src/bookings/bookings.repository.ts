import { InternalServerErrorException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { Vacancies } from "src/vacancies/vacancies.entity";
import { EntityRepository, Repository } from "typeorm";
import { Bookings, BookingStatus } from "./bookings.entity";

@EntityRepository(Bookings)
export class BookingsRepository extends Repository <Bookings> {
    async createBooking(candidate: User, vacancy: Vacancies) : Promise <Bookings> {
        const booking = this.create({ candidate, vacancy, status: BookingStatus.PROPOSED});
        try {
            await this.save(booking);
            return booking;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Candidate already booked');
        }
    }

    async createPrebooking(candidate: User, vacancy: Vacancies) : Promise <Bookings> {
        const booking = this.create({ candidate, vacancy, status: BookingStatus.APPROVED});
        try {
            await this.save(booking);
            return booking;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Candidate already booked');
        }
    }
}