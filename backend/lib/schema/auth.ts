import { z } from "zod";

import { UserSchema } from "./user";

const LoginSchema = UserSchema.partial({
  name: true
})

export type Login = z.infer<typeof LoginSchema>;

export const validate = (user: Login) => {
  const res = LoginSchema.safeParse(user);
  return res;
}
