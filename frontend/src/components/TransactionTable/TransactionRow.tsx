import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'
import { BiMovie } from 'react-icons/bi'

import Transaction from '../../types/Transaction'

interface Props {
  transaction: Transaction
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

const TransactionRow: React.FC<Props> = ({ transaction }) => {
  const { name, amount, newBalance, date } = transaction

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

export default React.memo(TransactionRow)
