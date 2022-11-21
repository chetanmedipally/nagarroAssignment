import mongoose from 'mongoose';
interface User {
  userId: string;
  email: string;
  password: string;
  friends: mongoose.Types.ObjectId[];
  _id: mongoose.Types.ObjectId;
}

export default User;