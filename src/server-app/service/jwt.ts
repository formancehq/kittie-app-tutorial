import jwt from 'jsonwebtoken';
import { User } from "../types/User";

export const secret = 'ssssssecret!';

export const createToken = (userId: string) : string => {
  return jwt.sign({
    userId,
  }, secret);
}