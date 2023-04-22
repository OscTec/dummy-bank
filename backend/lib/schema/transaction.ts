import { z } from "zod";

export const AccountSchema = z.object({
  id: z.string().uuid(),
  fromAccountId: z.string(),
  toAccountId: z.string(),
  amount: z.number(),
  transactionType: z.string(),
  transactionDate: z.string().datetime(),
})

export type Account = z.infer<typeof AccountSchema>;

export const validate = (account: Account) => {
  const res = AccountSchema.safeParse(account);
  return res;
};
