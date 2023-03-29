import Account from "../components/Account";
import Navbar from "../components/Navbar";
import { AccountType } from "../types/AccountType";

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: '#f2f2f2', height: '100vh' }} className="drop-shadow-2xl">
      <Navbar notifications={[]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center pt-4">
        <Account accountType={AccountType.Current} balance={300} />
        <Account accountType={AccountType.Credit} balance={200} />
        <Account accountType={AccountType.Savings} balance={5000} />
        <Account accountType={AccountType.Cash} balance={1000} />
        <Account accountType={AccountType.Stocks} balance={1000} />
      </div>
    </div>
  )
}

export default Dashboard
