import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ 
  timestamps: { createdAt: 'createdAt', updatedAt: 'modifiedAt' },
})
export class Room extends Document {
  @Prop({ required: true, unique: true })
  code!: string;

  @Prop({ type: Types.ObjectId, ref: 'Building', required: true })
  buildingId!: Types.ObjectId;

  @Prop({ required: true })
  floor!: number;

  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  capacity!: number;

  @Prop({ default: null })
  createdAt?: Date;

  @Prop({ default: null })
  updatedAt?: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);