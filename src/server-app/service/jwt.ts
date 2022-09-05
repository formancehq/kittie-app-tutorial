import jwt from 'jsonwebtoken';
import { User } from "../types/User";

export const secret = process.env['JWT_SECRET'] || "!#$%&'()0=~|!";

export const createToken = (userId: string) : string => {
  return jwt.sign({
    userId,
  }, secret);
}