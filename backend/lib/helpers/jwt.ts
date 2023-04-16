import * as jwt from "jsonwebtoken";

import { User } from "../schema/user";

export const generateToken = (user: User) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET);
  return token;
};

export const verifyToken = (token: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
