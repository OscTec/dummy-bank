import TransactionRow from './TransactionRow'
import TransactionRowSkeleton from './TransactionRowSkeleton'

import Transaction from '../../types/Transaction'

interface Props {
  transactions: Transaction[]
  isLoading: boolean
}

const TransactionTable: React.FC<Props> = ({ transactions, isLoading }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>New balance</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            [1, 2, 3, 4, 5].map((i) => <TransactionRowSkeleton key={i} />)
          ) : (
            transactions?.length > 0 && transactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>New balance</th>
            <th>Date</th>
          </tr>
        </tfoot>

      </table>
    </div>
  )
}

export default TransactionTable
