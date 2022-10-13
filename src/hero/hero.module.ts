//Libraries
import { Module } from "@nestjs/common";
//controller
import { HeroController } from "./controller/hero.controller";
//Services
import { MarvelHerosService } from "./services/marvel-heros.service";
import { HeroSQLService } from "./services/hero-sql-service";
import { HeroNoSQLService } from "./services/hero-nosql-service";
import { HttpModule } from "@nestjs/axios";
import { HeroeSchema } from "./database/schemas/heroe-nosql.schema";
import { Heroe } from "./database/entities/heroe-sql.entity"
import { TypeOrmModule } from "@nestjs/typeorm";
import { MongooseModule } from "@nestjs/mongoose";
import { Comic, ComicSchema } from "./database/schemas/comic-nosql.schema";
import { ComicSummary, ComicSummarySchema } from "./database/schemas/comicSummary-nosql.schema";
import { ComicSQL } from "./database/entities/comic-sql.entity";


// ComicEntity, ComicSummaryEntity
@Module({
    imports:[
        HttpModule,
        TypeOrmModule.forFeature([Heroe,ComicSQL]),
        MongooseModule.forFeature([
            { name: Heroe.name, schema: HeroeSchema },
            { name: Comic.name, schema: ComicSchema },
            { name: ComicSummary.name, schema: ComicSummarySchema },
            
          ]),
    ],
    controllers:[HeroController],
    providers:[MarvelHerosService, HeroSQLService, HeroNoSQLService],
})

export class HeroModule{}