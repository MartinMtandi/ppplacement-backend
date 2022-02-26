import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { BookingStatus } from "../bookings.entity";

export class BookingsExtendedDto {
    @IsEnum(BookingStatus)
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'status'})
    status: BookingStatus;
}