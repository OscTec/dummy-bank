import { z } from "zod";

export const TransactionSchema = z.object({
  accountId: z.string().uuid(),
  otherAccountId: z.string().uuid(),
  transactionId: z.string().uuid(),
  amount: z.number(),
  reference: z.string(),
  transactionType: z.string(),
  createdAt: z.string().datetime(),
})

export type Transaction = z.infer<typeof TransactionSchema>;

export const validate = (transaction: Transaction) => {
  const response = TransactionSchema.safeParse(transaction);
  return response;
};
