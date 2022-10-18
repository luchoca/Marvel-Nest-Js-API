import {PartialType} from '@nestjs/mapped-types';
import { CreateHeroeSQLDto } from "./create-heroeSQL.dto";
 


export class UpdateHeroeSQLDto extends PartialType(CreateHeroeSQLDto){}