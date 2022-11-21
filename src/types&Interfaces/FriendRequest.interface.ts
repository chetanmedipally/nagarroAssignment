import mongoose from 'mongoose';
interface FriendRequest {
  senderId: mongoose.Types.ObjectId;
  recepientId: mongoose.Types.ObjectId;
  status: string;
  _id: mongoose.Types.ObjectId
}

export default FriendRequest;