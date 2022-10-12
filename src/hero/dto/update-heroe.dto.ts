import { CreateHeroeDto } from "./create-heroe.dto";
import {PartialType} from '@nestjs/mapped-types';
 


export class UpdateHeroeDto extends PartialType(CreateHeroeDto){}