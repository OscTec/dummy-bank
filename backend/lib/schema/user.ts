import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(8),
})

export type User = z.infer<typeof UserSchema>;

export const validate = (user: User) => {
  const res = UserSchema.safeParse(user);
  return res;
};
