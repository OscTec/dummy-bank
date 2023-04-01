import Account from "../components/Account";
import AccountSkeleton from "../components/AccountSkeleton";
import useAccounts from "../hooks/useAccounts";

const Accounts = () => {
  const { data, error, isLoading } = useAccounts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center pt-4">
      {true && [1, 2].map((i) => <AccountSkeleton key={i} />)}
      {error && <div>Something went wrong</div>}
      {data && data.map(account => (
        <Account key={account.id} accountType={account.type} balance={account.balance} />
      ))}
    </div>
  )
}

export default Accounts
