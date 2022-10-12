import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateHeroeDto{
    
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
    thumbnail:string;
}