import { z } from "zod";

export const AccountSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  balance: z.number(),
  accountType: z.string(),
})

export const UpdateSchema = AccountSchema.partial({
  id: true,
  userId: true,
  accountType: true,
})

export type Account = z.infer<typeof AccountSchema>;

export const validate = (account: Account) => {
  const res = AccountSchema.safeParse(account);
  return res;
};

export const validateUpdate = (account: Account) => {
  const res = UpdateSchema.safeParse(account);
  return res;
}
