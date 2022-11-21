import mongoose from 'mongoose';
import UserInterface from "../types&Interfaces/User.interface"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, { timestamps: true });

export const User = mongoose.model<UserInterface & mongoose.Document>('User', userSchema);