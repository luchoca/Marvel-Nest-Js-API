import { IsInt, IsPositive, IsString, Min } from 'class-validator';
import mongoose, { ObjectId } from 'mongoose';
import { ObjectID } from 'typeorm';
import { ComicSummary } from '../database/schemas/comicSummary-nosql.schema';

export class CreateComicDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  id: number;

  @IsString()
  @IsPositive()
  @Min(1)
  title: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  issueNumber: number;

  @IsPositive()
  @Min(1)
  comicSummaryId: ObjectId;
}
