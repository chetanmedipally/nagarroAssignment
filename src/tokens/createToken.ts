import jwt from 'jsonwebtoken';
import User from "../types&Interfaces/User.interface";
export interface TokenData {
  token: string;
}

export interface DataStoredInToken {
  userId: string;
}

const generateToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = {
    userId: user.userId,
  };
  return {
    token: jwt.sign(dataStoredInToken, process.env["JWT_SECRET"] as string, {
      expiresIn: '1h'
    })
  }
}

export default generateToken;