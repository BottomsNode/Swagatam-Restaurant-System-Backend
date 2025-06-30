import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AutomapperModule } from '@automapper/nestjs';
import { LocalStrategy } from './strategies/local-strategy';
import * as dotenv from 'dotenv';
import { CustomerProfile } from 'src/common/profile/customer.mapper.service';
import { JwtStrategy } from './strategies/jwt-strategy';
dotenv.config({ path: './.env' });

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'RFV545UVGBhyDR3453ngyugt6gt6ngvcRT4v',
      signOptions: { expiresIn: '1h' },
    }),
    AutomapperModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, CustomerProfile],
  exports: [AuthService],
})
export class AuthModule {}