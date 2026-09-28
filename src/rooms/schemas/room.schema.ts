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

  @Prop({ default: new Date() })
  createdAt?: Date;

  @Prop({ default: new Date() })
  updatedAt?: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);