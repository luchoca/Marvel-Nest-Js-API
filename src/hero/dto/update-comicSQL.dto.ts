import {PartialType} from '@nestjs/mapped-types';
import { CreateComicSQLDto } from "./create-comicSQL.dto";
 


export class UpdateComicSQLDto extends PartialType(CreateComicSQLDto){}