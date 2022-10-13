import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import { ComicSQL } from './comic-sql.entity';

@Entity()
export class Heroe{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    idHeroe:number;

    @Column()
    name:string;
 
    @Column({nullable:true}) 
    description: string;

    @Column()
    path:string;

    @Column()
    extension:string;

    @ManyToMany(()=>ComicSQL,(comic)=>comic.heroes)
    @JoinTable({name:"heroe_comic"})
    comics: ComicSQL[];
}