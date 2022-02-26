import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class InvoiceDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'timesheetId'})
    timesheetId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'hoursWorked'})
    hoursWorked: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'vat'})
    vat: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'billRate'})
    billRate: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'payRate'})
    payRate: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'grossIncome'})
    grossIncome: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'grossProfitMargin'})
    grossProfitMargin: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'grossPay'})
    grossPay: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'grossProfit'})
    grossProfit: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'transportDeduction'})
    transportDeduction: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'training'})
    training: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'cancellingFine'})
    cancellingFine: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'additionAmount'})
    additionAmount: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'reasonForAmount'})
    reasonForAmount: string;
} 