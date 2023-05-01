export default interface Transaction {
  id: string;
  name: string;
  amount: number;
  newBalance: number;
  category?: string;
  date: string;
}
