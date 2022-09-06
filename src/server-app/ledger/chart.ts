import { User } from "../types/User";

// Helper function to compute wallet name from user ID
export const wallet = (u: User) : string => {
  return `users:${u.id}:wallet`;
}