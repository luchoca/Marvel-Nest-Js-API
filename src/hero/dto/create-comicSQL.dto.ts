import { IsInt, IsPositive, IsString, Min } from 'class-validator';


export class CreateComicSQLDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  idComic: number;

  @IsString()
  @IsPositive()
  @Min(1)
  name: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  issueNumber: number;

}
