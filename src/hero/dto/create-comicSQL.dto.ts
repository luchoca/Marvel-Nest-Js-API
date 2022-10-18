import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';


export class CreateComicSQLDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  idComic: number;

  @IsString()
  @IsPositive()
  @MinLength(1)
  name: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  issueNumber: number;

}
