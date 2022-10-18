import { BadRequestException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ComicSQL } from "../database/entities/comic-sql.entity";
import { Heroe } from "../database/entities/heroe-sql.entity";
import { CreateComicSQLDto } from "../dto/create-comicSQL.dto";
import { CreateHeroeSQLDto } from "../dto/create-heroeSQL.dto";

@Injectable()
export class HeroSQLService {
    constructor(
        @InjectRepository(Heroe)
        private readonly heroeRepository: Repository<Heroe>,
        @InjectRepository(ComicSQL)
        private readonly comicRepository: Repository<ComicSQL>,
      ) {}


    async save(heroeDto:CreateHeroeSQLDto, idHeroe:number){
        const existe = await this.heroeRepository.findOneBy({idHeroe:idHeroe})
        if(!existe){
            return await this.heroeRepository.save(heroeDto)
        }else{
            throw new BadRequestException('Ya esiste miaaaaamor!')

        }

    
    }

    async saveComics(comicsDto:CreateComicSQLDto[]){
        const comicRetorno = comicsDto.map(async (comicDto)=>{
            const existe = await this.comicRepository.findOneBy({idComic:comicDto.idComic})
            if(!existe){
                return await this.comicRepository.save(comicDto)
            }else{
                return existe
            }

        })
        return Promise.all(comicRetorno)
    }


    async deleteHero(idHeroe: string){
        const heroeDelete = await this.heroeRepository.delete(idHeroe);
        return heroeDelete;
      }


    update(){
        throw new Error('no está implementado')
    }


    
}