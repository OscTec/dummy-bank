import AccountType from "./AccountType";

export default interface Account {
  id: string;
  name: string;
  accountNumber?: number;
  sortCode?: number;
  balance: number;
  currency: string;
  type: AccountType;
  createdAt: string;
  updatedAt: string;
}
