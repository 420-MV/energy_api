import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { BuildingsModule } from './buildings/buildings.module';
import { RoomsModule } from './rooms/rooms.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'config/database.config';
import Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    HealthModule, 
    BuildingsModule, 
    RoomsModule,
    // 1. Gestion des configurations avec validation stricte
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig], // Charge notre fichier de config
      validationSchema: Joi.object({
        // Si MONGO_URI est absent, NestJS plantera immédiatement avec un message clair
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),

    // 2. Connexion asynchrone et sécurisée à MongoDB
    MongooseModule.forRootAsync({
      //imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // Récupération typée et sécurisée
        uri: configService.get<string>('database.uri'),
        // Options de production recommandées
        autoIndex: process.env.NODE_ENV !== 'production', // Désactive l'auto-indexation en prod pour les performances
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
