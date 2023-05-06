import React from 'react'

import { AiOutlineShopping } from 'react-icons/ai'
import { BiMovie } from 'react-icons/bi'

interface Props {
  category?: string
}

const CategoryIcon: React.FC<Props> = ({ category = 'Shopping' }) => {
  switch (category) {
    case 'Entertainment':
      return <BiMovie data-testid="entertainment-icon" size={32} />
    case 'Shopping':
      return <AiOutlineShopping data-testid="shopping-icon" size={32} />
    default:
      return <BiMovie data-testid="entertainment-icon" size={32} />
  }
}

export default CategoryIcon
