import * as jwt from "jsonwebtoken";

import { User } from "../schema/user";

interface DecodedToken {
  id: string;
  email: string;
  name: string;
  iat: number;
}

export const generateToken = (user: User) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET);
  return token;
};

export const verifyToken = (token: string): DecodedToken => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  return jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
};
