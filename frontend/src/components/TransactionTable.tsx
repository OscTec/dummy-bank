import { AiOutlineShopping } from 'react-icons/ai'
import { BiMovie } from 'react-icons/bi'

import Transaction from '../types/Transaction'

interface Props {
  transactions: Transaction[]
  isLoading: boolean
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Entertainment':
      return <BiMovie size={32} />
    case 'Shopping':
      return <AiOutlineShopping size={32} />
    default:
      return <BiMovie size={32} />
  }
}

const TransactionRowSkeleton = () => {
  return (
    <tr>
      <td>
        <div className="animate-pulse flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded-full bg-slate-200 h-8 w-8"></div>
          </div>
          <div>
            <div className="font-bold h-4 w-32 bg-gray-300 rounded" />
          </div>
        </div>
      </td>
      <td>
        <div className="animate-pulse h-2 bg-slate-200 rounded col-span-2"></div>
      </td>
      <td>
        <div className="animate-pulse h-2 bg-slate-200 rounded col-span-2"></div>
      </td>
      <td>
        <div className="animate-pulse h-2 bg-slate-200 rounded col-span-2"></div>
      </td>
    </tr>
  )
}

const TransactionRow = ({ transaction: { name, amount, newBalance, date } }: { transaction: Transaction }) => {
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="flex">
              {getCategoryIcon(name)}
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
          </div>
        </div>
      </td>
      <td>
        {amount < 0 ? (
          <span className="text-red-500">{amount}</span>
        ) : (
          <span className="text-green-500">{amount}</span>
        )}
      </td>
      <td>{newBalance}</td>
      <td>{date}</td>
    </tr>
  )
}

const TransactionTable = ({ transactions, isLoading }: Props) => {
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
          {isLoading
            ? [1, 2, 3, 4, 5].map((i) => <TransactionRowSkeleton key={i} />)
            : transactions &&
            transactions.length > 0 &&
            transactions.map((transaction) => <TransactionRow key={transaction.id} transaction={transaction} />)}
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
