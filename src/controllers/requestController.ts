import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { User } from "../models/User";
import { FriendRequest } from "../models/FriendRequest";
import RequestWithUser from '../types&Interfaces/requestWithUser.interface';
import { validationResult } from 'express-validator'


export const sendRequest = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  console.time('sendRequest');
  const { recipientUserId } = req.body;
  const senderUserId = req.user?.userId
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array().map(error => error.msg).join(".");
    res.status(422)
    throw new Error(errorMsg);
  }
  const requestSender = await User.findOne({ userId: senderUserId });
  const requestReceipient = await User.findOne({ userId: recipientUserId });
  const request = await FriendRequest.create({
    senderId: requestSender?._id,
    recepientId: requestReceipient?._id,
    status: "pending"
  })
  if (request) {
    res.status(201).json({
      request
    })
  } else {
    res.status(400)
    throw new Error('Invalid request data')
  }
  console.timeEnd('sendRequest')
})

export const acknowledgeRequest = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  console.time('acknowledgeRequest');
  const { accept, requestId } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array().map(error => error.msg).join(".");
    res.status(422)
    throw new Error(errorMsg);
  }
  const request = await FriendRequest.findOne({ _id: requestId, status: "pending", recepientId: req.user?._id });
  if (request) {
    if (accept) {
      request.status = "accepted";
      await request.save()
      const requestSender = await User.findById(request.senderId);
      requestSender?.friends.push(request.recepientId);
      await requestSender?.save();
    }
    else {
      request.status = "rejected";
      await request.save()
    }
  } else {
    res.status(404)
    throw new Error('No pending requests found')
  }
  res.status(200).json({
    request
  })
  console.timeEnd('acknowledgeRequest')
})

