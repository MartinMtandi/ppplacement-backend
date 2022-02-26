import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UsersRepository } from './users.repository';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { Speciality } from 'src/specialities/speciality.entity';
import { Tokens } from './types';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository) private usersRepository: UsersRepository, 
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
        const hashedRefreshToken = await argon2.hash(refreshToken);
        await this.usersRepository.save({id: userId, refresh_token: hashedRefreshToken});
    }

    async signUp(authCredentialsDto: AuthCredentialsDto, speciality: Speciality): Promise<Tokens>{
        const {email} = authCredentialsDto;
        const user = await this.usersRepository.findOne({email});
        
        if(!user){
            const result = await this.usersRepository.createUser(authCredentialsDto, speciality);
            const payload: JwtPayload = {email, userId: result.id, role: result.role};
            const tokens = await this.getTokens(payload.userId, payload.email, payload.role);
           
            await this.updateRefreshTokenHash(result.id, tokens.refresh_token);

            return tokens;

        }else{
            throw new ConflictException('This user already exists');
        }
        
    }

    async signIn(loginCredentialsDto: LoginCredentialsDto): Promise <Tokens> {
        const {email, password} = loginCredentialsDto;
        const user = await this.usersRepository.findOne({email: email});
        if(user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = {email, userId: user.id, role: user.role};
            const tokens = await this.getTokens(payload.userId, payload.email, payload.role);

            await this.updateRefreshTokenHash(user.id, tokens.refresh_token);

            return tokens;
        }else {
            throw new UnauthorizedException('Please check your login credentials')
        }
    }

    async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<void> {
        const {newPassword, currentPassword} = changePasswordDto;
        const user = await this.usersRepository.findOne(userId);

        if(user && (await bcrypt.compare(currentPassword, user.password))){
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            let candidate = {id: userId, password: hashedPassword};

            await this.usersRepository.save(candidate);

            return;
        }else{
            throw new UnauthorizedException('Verify your current password')
        }
    }

    async logout (userId: string) {
        await this.usersRepository.save({id: userId, refresh_token: null});
    }

    async refreshToken (userId: string, refreshToken: string) {
        const user = await this.usersRepository.findOne(userId);

        if(!user.refresh_token) throw new UnauthorizedException('Unkown user');

        if(user && (await argon2.verify(user.refresh_token, refreshToken))){
            const payload: JwtPayload = {email: user.email, userId: user.id, role: user.role};
            const tokens = await this.getTokens(payload.userId, payload.email, payload.role);

            try {
                await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
            } catch (error) {
                throw new InternalServerErrorException();
            }
            
            return tokens;
        }else{
            throw new UnauthorizedException('Access denied');
        }
    }
}
