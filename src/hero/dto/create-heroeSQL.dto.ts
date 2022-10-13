import { IsArray, IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";
import { ComicSQL } from "../database/entities/comic-sql.entity";

export class CreateHeroeSQLDto{
    
    @IsInt()
    @IsPositive()
    @Min(1)
    idHeroe:number

    @MinLength(1)
    @IsString()
    name:string;

    @MinLength(1)
    @IsString()
    description:string;

    @MinLength(1)
    @IsString()
    extension:string;
    
    @MinLength(1)
    @IsString()
    path:string;

    @IsArray()
    comics:ComicSQL[]
}