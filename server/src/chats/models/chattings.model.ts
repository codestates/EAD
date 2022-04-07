import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Chatting extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Room' })
  room_id: Types.ObjectId;

  @Prop()
  user: string;

  @Prop()
  userImg: string;

  @Prop()
  content: string;
}

const ChattingSchema = SchemaFactory.createForClass(Chatting);
export { ChattingSchema };
