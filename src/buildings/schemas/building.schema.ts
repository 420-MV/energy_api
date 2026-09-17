import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Building extends Document {
  @Prop({ required: true, unique: true })
  code!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  address!: string;

  @Prop({ required: true })
  yearBuilt!: number;

  @Prop({ default: () => new Date() })
  createdAt: Date;
  
  @Prop({ default: () => new Date() })
  updatedAt: Date;
}

export const BuildingSchema = SchemaFactory.createForClass(Building);