import React from 'react'
import CategoryIcon from '../../CategoryIcon'

interface Props {
  name: string
  category?: string
  amount: number
  newBalance: number
  date: string
}
const TransactionRow: React.FC<Props> = ({ name, category, amount, newBalance, date }) => {
  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="flex">
              {<CategoryIcon category={category} />}
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

export default TransactionRow
