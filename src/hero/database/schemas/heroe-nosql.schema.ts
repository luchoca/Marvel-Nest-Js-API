import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Comic } from "./comic-nosql.schema";

//las entidades hacen referencia a como yo voy a guardar en la Base de Datos
@Schema()
export class Heroe extends Document{

    @Prop()
    name:string;
    
    @Prop()
    idHeroe:number;

    @Prop()
    description:string;


    @Prop({ type: {} })
    thumbnail: {
      path: string;
      extension: string;
    };
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Comic.name}])
  idComics: number;
}

export const HeroeSchema = SchemaFactory.createForClass(Heroe)