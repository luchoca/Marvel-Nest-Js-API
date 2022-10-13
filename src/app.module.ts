import { Module } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';


console.log(process.env.ENV)
@Module({
  imports: [
    HeroModule, 
    HttpModule,   
    //Configuración para variables de entorno
    ConfigModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/environments/.env.${process.env.ENV.trim()}`,
      isGlobal:true,
    }),
    //Configuración para la conexión con MongoDB usando Mongoose
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService:ConfigService)=>({
        uri: configService.get<string>('NOSQL_URI'),
      }),
    }),
//Configuración para la conexión con MySQL con TypeOrm
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:(configService: ConfigService) =>({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities:true,
        synchronize:true,
        logging: process.env.ENV === 'production' ? false:true,
      }),
    }),
      ],
  controllers: [],
  providers: [],
})
export class AppModule {}

