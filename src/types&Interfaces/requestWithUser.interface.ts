import { Request } from 'express';
import User from '../types&Interfaces/User.interface';

interface RequestWithUser extends Request {
  user?: User;
}

export default RequestWithUser;