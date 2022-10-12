import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { map, catchError, lastValueFrom } from 'rxjs';
import { CreateComicDto } from '../dto/create-comic.dto';
import { CreateHeroeDto } from '../dto/create-heroe.dto';
import { HeroNoSQLService } from './hero-nosql-service';

@Injectable()
export class MarvelHerosService {
  constructor(
    private readonly httpService: HttpService,
    private readonly heroeNoSQLService: HeroNoSQLService,
  ) {}

  async getAllHeros() {
    const hashCode = createHash('md5')
      .update(process.env.TS + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY)
      .digest('hex');

    const uri = `https://gateway.marvel.com:443/v1/public/characters?&apikey=${process.env.PUBLIC_KEY}&ts=${process.env.TS}&hash=${hashCode}`;
    return this.httpService
      .get(uri)
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );
  }

  async getHeroePorID(id: number): Promise<CreateHeroeDto> {
    const hashCode = createHash('md5')
      .update(process.env.TS + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY)
      .digest('hex');

    const uri = `https://gateway.marvel.com:443/v1/public/characters/${id}?&apikey=${process.env.PUBLIC_KEY}&ts=${process.env.TS}&hash=${hashCode}`;
    return lastValueFrom(
      this.httpService.get(uri).pipe(
        map((res) => {
          const heroDto = new CreateHeroeDto();
          const heroeAxios = res.data.data.results[0];
          heroDto.idHeroe = heroeAxios.id;
          heroDto.name = heroeAxios.name;
          heroDto.description = heroeAxios.description;
          heroDto.thumbnail = heroeAxios.thumbnail;
          return heroDto;
        }),
      ),
    );
  }

  async getComicPorIdHeroe(id: number): Promise<CreateComicDto[]> {
    const hashCode = createHash('md5')
      .update(process.env.TS + process.env.PRIVATE_KEY + process.env.PUBLIC_KEY)
      .digest('hex');

    const uri = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?&apikey=${process.env.PUBLIC_KEY}&ts=${process.env.TS}&hash=${hashCode}`;
    return lastValueFrom(
      this.httpService.get(uri).pipe(
        map(async (res) => {          
          const comics = res.data.data.results.map(async (comic) => {
            
            const comicDto = new CreateComicDto();
            comicDto.id = comic.id;
            comicDto.title = comic.title;
            comicDto.issueNumber = comic.issueNumber;
            return comicDto
          });
          //espero que todas las promesas se cumplan... mrvl s l mjr dl mnd
          return Promise.all(comics).then((comics)=> this.heroeNoSQLService.saveComics(comics,id))
        }),

      ),
    );
  }
}
