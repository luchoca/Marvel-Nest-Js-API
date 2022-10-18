import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  Query,
} from '@nestjs/common';
import { CreateHeroeSQLDto } from '../dto/create-heroeSQL.dto';
import { UpdateHeroeDto } from '../dto/update-heroe.dto';
import { HeroNoSQLService } from '../services/hero-nosql-service';
import { HeroSQLService } from '../services/hero-sql-service';
import { MarvelHerosService } from '../services/marvel-heros.service';

@Controller('hero')
export class HeroController {
  constructor(
    private readonly marvelHeroService: MarvelHerosService,
    private readonly heroNoSQLService: HeroNoSQLService,
    private readonly heroSQLService: HeroSQLService,
  ) {}

  //   --> CRUD NO SQL
  // @Get(':count/:page')
  // findAll(@Param('count', ParseIntPipe) count: number,
  //         @Param('page', ParseIntPipe) page:number
  // ):Array<CreateHeroeDto>{
  //   return this.marvelHeroService.getAllHeros(count, page);
  // }

  @Get()
  findAll() {
    return this.marvelHeroService.getAllHeros();
  }

  //SAVE COMIC BY HEROE ID
  @Post('nosql/crearComics/:id')
  async saveComicByHeroId(@Param('id', ParseIntPipe) id: number) {
    const comics = await this.marvelHeroService.getComicPorIdHeroe(id);
    return this.heroNoSQLService.saveComics(comics, id);
  }

  //SAVE HEROE
  @Post('nosql/:id')
  async saveHeroNoSQL(@Param('id', ParseIntPipe) id: number) {
    const hero = await this.marvelHeroService.getHeroePorID(id);
    return this.heroNoSQLService.save(hero, id);
  }

  //DELETE HEROE
  @Delete('nosql/:id')
  async deleteHeroNoSQL(@Param('id') idHeroe: string) {
    await this.heroNoSQLService.delete(idHeroe);
  }

  //UPDATE HEROE (cambie @Param por @Query)
  @Put('nosql/update/:idHeroe/:idNuevoHeroe')
  async updateHeroNoSQL(
    @Param('idHeroe') idHeroe: string,
    @Param('idNuevoHeroe', ParseIntPipe) idNuevoHeroe: number,
  ) {
    const nuevoHeroe = await this.marvelHeroService.getHeroePorID(idNuevoHeroe)
    const heroeUpdated = await this.heroNoSQLService.update( nuevoHeroe,idHeroe);
    return heroeUpdated
  }

  //--> CRUD SQL

  @Post('sql/:id')
  async saveHeroSQL(@Param('id', ParseIntPipe) id: number) {
    const heroe = await this.marvelHeroService.getHeroePorIDsql(id);
    return this.heroSQLService.save(heroe, id);
  }

    //DELETE HEROE
    @Delete('sql/:id')
    deleteHeroSQL(@Param('id') idHeroe: string) {
      const heroeDeleted = this.heroSQLService.deleteHero(idHeroe);
      return heroeDeleted
    }
}
