import { Controller, Get, Post, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateHeroeDto } from '../dto/create-heroe.dto';
import { HeroNoSQLService } from '../services/hero-nosql-service';
import { HeroSQLService } from '../services/hero-sql-service';
import { MarvelHerosService } from '../services/marvel-heros.service';


@Controller('hero')
export class HeroController {
  constructor(
    private readonly marvelHeroService: MarvelHerosService,
    private readonly heroNoSQLService: HeroNoSQLService,
    private readonly heroSQLService: HeroSQLService
    ) {}


    //--> CRUD NO SQL
  // @Get(':count/:page')
  // findAll(@Param('count', ParseIntPipe) count: number,
  //         @Param('page', ParseIntPipe) page:number
  // ):Array<CreateHeroeDto>{
  //   return this.marvelHeroService.getAllHeros(count, page);
  // }

  @Get()
  findAll(){
    return this.marvelHeroService.getAllHeros();
  }

  @Post('nosql/crearComics/:id')
  async saveComicByHeroId(@Param('id',ParseIntPipe) id:number){
    const comics = await this.marvelHeroService.getComicPorIdHeroe(id);
    return this.heroNoSQLService.saveComics(comics,id)
  }

  @Post('nosql/:id')
  async saveHeroNoSQL(@Param('id',ParseIntPipe) id:number){
    const hero = await this.marvelHeroService.getHeroePorID(id);
    return this.heroNoSQLService.save(hero,id);
  }

  @Put('nosql/:idHeroeExistente/:idNewHero')
  updateHeroNoSQL(
    @Param('idHeroeExistente') idHeroeExistente:string,
    @Param('idNuevoHeroe') idNuevoHeroe: string){
      this.heroNoSQLService.update();
    }

    @Delete('nosql/:id')
    deleteHeroNoSQL(@Param('id')idHeroe:string){
      this.heroNoSQLService.delete(idHeroe);
    }

  //--> CRUD SQL
  @Post('sql/:id')
  saveHeroSQL(@Param('id') id:string){
    //const hero  = this.marvelHeroService.getAllHeros(id);
    this.heroSQLService.save();
  }

  

}
