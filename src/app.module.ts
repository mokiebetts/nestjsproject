import Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ReservationModule } from 'src/reservation/reservation.module';
import { Reservation } from './reservation/entities/reservation.entity';
import { Performance } from './performance/entiites/perfromance.entity';
import { PerformanceModule } from './performance/performance.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { SeatController } from './seat/seat.controller';
import { SeatService } from './seat/seat.service';
import { SeatModule } from './seat/seat.module';
import { Seat } from './seat/seat.entities/seat.entity';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    entities: [User, Performance, Reservation, Seat],
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    AuthModule,
    UserModule,
    PerformanceModule,
    ReservationModule,
    SeatModule,
  ],
  controllers: [SeatController],
  providers: [SeatService],
})
export class AppModule {}
