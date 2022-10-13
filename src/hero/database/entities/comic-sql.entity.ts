import {Entity, Column, PrimaryGeneratedColumn, ManyToMany} from 'typeorm';
import { Heroe } from './heroe-sql.entity';

@Entity({name:"comic"})
export class ComicSQL{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    idComic:number;

    @Column()
    name:string;
 
    @Column()
    issueNumber:number;

    // @Column() 
    // comicSummaryId: string;

    @ManyToMany(()=>Heroe,(heroe)=>heroe.comics)
    heroes: Heroe[];

}