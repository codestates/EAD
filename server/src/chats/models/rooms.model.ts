import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Types, Document } from 'mongoose';
import { Chatting } from './chattings.model';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Room extends Document {
  @Prop()
  roomName: string;

  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true, ref: 'Chatting' },
      user: { type: String, required: true },
      content: { type: String },
    },
  })
  @IsNotEmpty()
  chat: Chatting;

  @Prop([String])
  users: [];
}

const RoomSchema = SchemaFactory.createForClass(Room);
export { RoomSchema };
