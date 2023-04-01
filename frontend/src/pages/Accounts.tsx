import Account from "../components/Account";
import AccountType from "../types/AccountType";

const Accounts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center pt-4">
      <Account accountType={AccountType.Current} balance={300} />
      <Account accountType={AccountType.Credit} balance={200} />
      <Account accountType={AccountType.Savings} balance={5000} />
      <Account accountType={AccountType.Cash} balance={1000} />
      <Account accountType={AccountType.Stocks} balance={1000} />
    </div>
  )
}

export default Accounts