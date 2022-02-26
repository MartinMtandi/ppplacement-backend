import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import { Speciality } from './speciality.entity';

export const GetSpeciality = createParamDecorator((_data, ctx: ExecutionContext): Speciality => {
    const req = ctx.switchToHttp().getRequest();
    return req.speciality;
})