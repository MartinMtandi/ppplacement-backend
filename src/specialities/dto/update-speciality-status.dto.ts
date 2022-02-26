import { IsEnum } from "class-validator";
import { SpecialityStatus } from "../specialities-status.enum";

export class UpdateSpecialityStatusDto {
    @IsEnum(SpecialityStatus)
    status: SpecialityStatus
}