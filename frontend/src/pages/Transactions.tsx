import BackButton from '../components/BackButton'
import TransactionTable from '../components/TransactionTable'
import useTransactions from '../hooks/useTransactions'

const Transactions = () => {
  const { data, error, isLoading } = useTransactions()

  return (
    <div>
      <div className="flex items-center back bg-gray-200">
        <BackButton />
        <h1 className="text-xl ml-3">Transactions</h1>
      </div>
      <TransactionTable transactions={data} isLoading={isLoading} />
    </div>
  )
}

export default Transactions