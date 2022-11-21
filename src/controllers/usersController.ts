import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator'
import asyncHandler from 'express-async-handler';
import bycrypt from "bcryptjs"
import { User } from "../models/User";
import generateToken from "../tokens/createToken";
import RequestWithUser from '../types&Interfaces/requestWithUser.interface';
import Error from "../types&Interfaces/Error";


export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.time('signup');
  const { email, password, userId } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array().map(error => error.msg).join(".");
    res.status(422)
    throw new Error(errorMsg);
  }

  const userExists = await User.findOne({ userId });

  if (userExists) {
    res.status(403)
    throw new Error('User already exists')
  }

  const hashedPassword = await bycrypt.hash(password, 12);
  const user = await User.create({
    email,
    password: hashedPassword,
    userId
  })
  if (user) {
    user.password = '';
    res.status(201).json({
      user,
      token: generateToken(user)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
  console.timeEnd('signup');
})

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.time('login');
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array().map(error => error.msg).join(".");
    res.status(422)
    const error: Error = new Error(errorMsg);
    error.statusCode = 422;
    throw error;
  }
  const user = await User.findOne({ email })
  if (user && await (bycrypt.compare(password, user.password))) {
    user.password = '';
    res.status(200).json({
      user,
      token: generateToken(user)
    })
  } else {
    res.status(401)
    const error: Error = new Error("Invalid credentials or user doesn't exists");
    error.statusCode = 401;
    throw error;
    //throw new Error('Invalid credentials')
  }
  console.timeEnd('login');
})

export const getUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.time('getUsers');
  const currentPage = req.query.page || 1;
  const itemsPerPage = req.query.itemsPerPage || 2;
  const totalUsers: number = await User.find().countDocuments();
  const users = await User.find().select('-password')
    .populate('friends', { email: 1, userId: 1 }).sort({ createdAt: -1 })
    .skip((+currentPage - 1) * +itemsPerPage)
    .limit(+itemsPerPage);
  res.status(200).json({
    message: 'Users fetched successfully!',
    users: users,
    totalUsers: totalUsers
  })
  console.timeEnd('getUsers');
})

export const getFriends = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction): Promise<any> => {
  console.time('getFriends');
  const userId = req.user?.userId;
  const totalFriends = await User.aggregate([{
    $match: { userId: userId }
  }, { $project: { _id: 0, friendsCount: { $size: "$friends" } } }])
  const user = await User.findOne({ userId: userId }).populate('friends', { email: 1, userId: 1 });
  // const friends = await User.aggregate([
  //   { $match: { _id: new mongoose.Types.ObjectId(userId) } },
  //   { $lookup: { from: "users", localField: "friends", foreignField: "_id", as: "friends" } },
  //   { $project: { friends: 1, _id: 0 } },
  //   { $unwind: "$friends" },
  //   { $group: { _id: 0, allFriends: { $push: "$friends" } } },
  //   { $project: { "allFriends.email": 1, "allFriends.userId": 1 } },
  // ])
  res.status(200).json({
    message: 'User friends fetched successfully!',
    // friends: friends[0].allFriends,
    friends: user?.friends,
    totalFriends: totalFriends[0].friendsCount
  })
  console.timeEnd('getFriends');
})