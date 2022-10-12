
import { IsInt, IsPositive, IsString, Min } from 'class-validator';

export class ComicSummaryDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  idSummary: number;
  @IsString()
  @IsPositive()
  @Min(1)
  description: string;

  @IsString()
  @IsPositive()
  @Min(1)
  resourceURI: string;
}
