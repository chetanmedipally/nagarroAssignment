import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response } from "express";
import RequestWithUser from '../types&Interfaces/requestWithUser.interface';
import asyncHandler from 'express-async-handler';
import UserInterface from '../types&Interfaces/User.interface';
import { User } from "../models/User";
interface decodedTokenData {
  userId: string;
  iat?: Date;
  exp?: Date;
}

const protect = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  console.time('protect')
  let token: string | undefined;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env["JWT_SECRET"] as string) as decodedTokenData;
      req.user = await User.findOne({ userId: decoded.userId }) as UserInterface
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Token invalid or expired')
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Authorized.');
  }
  console.timeEnd('protect')
}
export default protect;