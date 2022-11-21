import express from "express";
import * as requestsController from '../controllers/requestController'
import protect from "../middleware/authMiddleware";
import { body } from 'express-validator';
import { isObjectIdOrHexString } from "mongoose";
const router = express.Router();

const sendRequestValidators = [
  body("recipientUserId")
    .exists()
    .isString()
]

const ackRequestValidators = [
  body("accept")
    .exists()
    .isBoolean(),
  body("requestId")
    .exists()
    .isMongoId()
]

router.post('/sendrequest', sendRequestValidators, protect, requestsController.sendRequest);
router.post('/ackrequest', ackRequestValidators, protect, requestsController.acknowledgeRequest);

export default router;