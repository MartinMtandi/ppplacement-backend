import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalSigninDto } from './dto/internal-signin.dto';
import { InternalUsersDto } from './dto/internal-users.dto';
import { InternalUser } from './internal-users.entity';
import { ConfigService } from '@nestjs/config';
import { InternalUserRepository } from './internal-users.repository';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { Tokens } from 'src/auth/types';

@Injectable()
export class InternalUsersService {
    constructor(
        @InjectRepository(InternalUserRepository) private internalUserRepository: InternalUserRepository, 
        private jwtService: JwtService,
        private config: ConfigService,
    ){}

    async getTokens(userId: string, email: string, role: string): Promise <Tokens>{
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
                role,
            }, {
                secret: this.config.get<string>('JWT_SECRET'),
                expiresIn: 60 * 10,
            }),

            this.jwtService.signAsync({
                sub: userId,
                email,
                role,
            }, {
                secret: this.config.get<string>('JWT_REFRESH_SECRET'),
                expiresIn: '30d',
            }),
        ]);

        return {
            access_token,
            refresh_token
        }
    }

    async updateRefreshTokenHash(userId: string, refreshToken: string) {
        const salt = await bcrypt.genSalt();
        const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
        await this.internalUserRepository.save({id: userId, refresh_token: hashedRefreshToken});
    }

    async logout (userId: string) {
        await this.internalUserRepository.save({id: userId, refresh_token: null});
    }

    async signup(internalUserDto: InternalUsersDto) : Promise<InternalUser> {
        const { email } = internalUserDto;
        const user  = await this.internalUserRepository.findOne({email});

        if(!user){
            return await this.internalUserRepository.createInternalUser(internalUserDto);
        }else{
            throw new ConflictException('This user already exists');
        }
    }

    async signIn(internalSigninDto: InternalSigninDto) : Promise <Tokens> {
        const { email, password } = internalSigninDto;
        const user = await this.internalUserRepository.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = {email, userId: user.id, role: user.role};
            const tokens = await this.getTokens(payload.userId, payload.email, payload.role);
            
            await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

            return tokens;
        }else {
            throw new UnauthorizedException('Please check your login credentials')
        }
    }

    async refreshToken (userId: string, refreshToken: string) {
        const user = await this.internalUserRepository.findOne(userId);

        if(!user.refresh_token) throw new UnauthorizedException();

        if(user && (await bcrypt.compare(refreshToken, user.refresh_token))){
            const payload: JwtPayload = {email: user.email, userId: user.id, role: user.role};
            const tokens = await this.getTokens(payload.userId, payload.email, payload.role);

            await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

            return tokens;
        }else{
            throw new UnauthorizedException('Access denied')
        }
    }

    async getUserById(id: string) : Promise <InternalUser> {
        try {
            const result = await this.internalUserRepository.findOne(id);
            
            if(!result){
                throw new NotFoundException();
            }
    
            return result;
        } catch (error) {
            throw new BadRequestException();
        }
    }
}
