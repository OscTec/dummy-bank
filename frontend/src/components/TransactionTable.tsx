import { AiOutlineShopping } from 'react-icons/ai'
import { BiMovie } from 'react-icons/bi'

interface Transaction {
  id: string
  name: string
  amount: number
  newBalance: number
  category: string
  date: string
}

interface Props {
  transactions: Transaction[]
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

const TransactionTable = ({ transactions }: Props) => {
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
          {transactions.map((transaction) => <TransactionRow key={transaction.id} transaction={transaction} />)}
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
