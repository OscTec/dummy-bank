
import BackButton from '../components/BackButton'
import TransactionTable from '../components/TransactionTable/TransactionTable'
import useTransactions from '../hooks/useTransactions'

const Transactions: React.FC = () => {
  const { data, error, isLoading } = useTransactions()

  return (
    <>
      <div className="flex w-full items-center bg-gray-200">
        <BackButton />
        <h1 className="text-xl ml-3">Transactions</h1>
      </div>
      <TransactionTable transactions={data} isLoading={isLoading} />
    </>
  )
}

export default Transactions
