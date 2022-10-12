import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { ComicSummary } from "./comicSummary-nosql.schema";

export type PersonajeDocument = Comic & Document;

@Schema()
export class Comic {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  issueNumber: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ComicSummary.name})
  comicSummaryId: number;

}

export const ComicSchema = SchemaFactory.createForClass(Comic);