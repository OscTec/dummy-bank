import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { BiMovie } from 'react-icons/bi'

import Transaction from '../../../types/Transaction'

interface Props {
  transaction: Transaction
}

// NOTE - This is probably not the best place fot this function
// but until it's used elsewhere, it's fine here
const getCategoryIcon = (category: string = '') => {
  switch (category) {
    case 'Entertainment':
      return <BiMovie data-testid="entertainment-icon" size={32} />
    case 'Shopping':
      return <AiOutlineShopping data-testid="shopping-icon" size={32} />
    default:
      return <BiMovie data-testid="entertainment-icon" size={32} />
  }
}

const TransactionRow: React.FC<Props> = ({ transaction }) => {
  const { name, category, amount, newBalance, date } = transaction

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="flex">
              {getCategoryIcon(category)}
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
