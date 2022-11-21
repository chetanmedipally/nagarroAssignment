import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import FriendRequestInterface from '../types&Interfaces/FriendRequest.interface';
const friendRequestSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recepientId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export const FriendRequest = mongoose.model<FriendRequestInterface & mongoose.Document>('FriendRequest', friendRequestSchema);
