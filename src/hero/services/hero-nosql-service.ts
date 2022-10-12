import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { Comic } from '../database/schemas/comic-nosql.schema';
import { Heroe } from '../database/schemas/heroe-nosql.schema';
import { CreateComicDto } from '../dto/create-comic.dto';
import { CreateHeroeDto } from '../dto/create-heroe.dto';
import { IComic } from '../interface/comic.interface';
import { IHero } from '../interface/hero.interface';

@Injectable()
export class HeroNoSQLService {
  constructor(
    @InjectModel(Heroe.name)
    private readonly heroeModel: Model<IHero>,
    @InjectModel(Comic.name)
    private readonly comicModel: Model<IComic>,
  ) {}

  async save(heroDto: CreateHeroeDto, idHeroe: number): Promise<IHero> {
    const heroe = await this.heroeModel.findOne({ idHeroe: idHeroe });
    if (heroe) {
      throw new BadRequestException('Ya existe Heroe');
    } else {
      const heroe = await this.heroeModel.create(heroDto);
      return heroe.save();
    }
  }

  async delete(idHeroe: string): Promise<IHero> {
    const heroeDelete = await this.heroeModel.findByIdAndDelete(idHeroe);
    return heroeDelete;
  }

  async saveComics(comicsDto: CreateComicDto[], id: number): Promise<IComic[]> {
    const comicsCreados = comicsDto.map(async (comicDto) => {
      const comicExiste = await this.comicModel.findOne({ id: comicDto.id });
      if (!comicExiste) {
        const comic = new this.comicModel(comicDto);
        return await comic.save();
      } else {
        return comicExiste;
      }
    });
    const comicsRetornados = await Promise.all(comicsCreados);
    const idComics = comicsRetornados.map((comic) => comic._id);
    await this.heroeModel
      .findOneAndUpdate({ idHeroe: id }, { idComics: idComics })
      console.log(id);
      

    return comicsRetornados;
  }

  update() {
    throw new Error('no está implementado');
  }
}
