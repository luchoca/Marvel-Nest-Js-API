import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { Comic } from '../database/schemas/comic-nosql.schema';
import { Heroe } from '../database/schemas/heroe-nosql.schema';
import { CreateComicDto } from '../dto/create-comic.dto';
import { CreateHeroeDto } from '../dto/create-heroe.dto';
import { UpdateHeroeDto } from '../dto/update-heroe.dto';
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



//SAVE
  async save(heroDto: CreateHeroeDto, idHeroe: number): Promise<IHero> {
    const heroe = await this.heroeModel.findOne({ idHeroe: idHeroe });
    if (heroe) {
      throw new BadRequestException('Ya existe Heroe');
    } else {
      const heroe = await this.heroeModel.create(heroDto);
      return heroe.save();
    }
  }



//DELETE
  async delete(idHeroe: string): Promise<IHero> {
    const heroeDelete = await this.heroeModel.findByIdAndDelete(idHeroe);
    return heroeDelete;
  }



//SAVE COMICS EN CHARACTERS
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


  ///UPDATE
  async update(nuevoHeroe: CreateHeroeDto, id: string) {

    const actualizado = await this.heroeModel.findByIdAndUpdate(id, nuevoHeroe,{new:true})
    if(!actualizado) throw new BadRequestException("Algo salio mal !")
    return actualizado;

  }

}






// await this.characterRepository
//             .createQueryBuilder()
//             .update(CharacterEntity)
//             .set({name: newName})
//             .where({char_id: id})
//             .execute();



// await this.characterRepository
//         .createQueryBuilder()
//         .delete()
//         .from(CharacterEntity)
//         .where({char_id: id})
//         .execute()