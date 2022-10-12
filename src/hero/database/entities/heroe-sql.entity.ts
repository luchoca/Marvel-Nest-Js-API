import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('Heroe')
export class Heroe{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idCharacter:string;

    @Column()
    name:string;
 
    @Column() 
    description: string;

    @Column()
    thumbnail:string;
}