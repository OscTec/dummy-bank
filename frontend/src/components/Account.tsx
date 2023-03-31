import { ReactNode } from 'react';
import { AiOutlineStock } from 'react-icons/ai';
import { BsCash, BsCreditCard } from 'react-icons/bs';
import { CiVault } from 'react-icons/ci';
import { GiCash } from 'react-icons/gi';

import { AccountType } from '../types/AccountType';
import Card from './Card';
import { Link } from 'react-router-dom';


interface Props {
  accountType: AccountType
  balance: number
}

const accountMap: { [key: number]: { title: string, icon: ReactNode } } = {
  1: { title: 'Current Account', icon: <BsCash size={32} /> },
  2: { title: 'Credit Account', icon: <BsCreditCard size={32} /> },
  3: { title: 'Savings Account', icon: <CiVault size={32} /> },
  4: { title: 'Cash ISA', icon: <GiCash size={32} /> },
  5: { title: 'S&S ISA', icon: <AiOutlineStock size={32} /> },
}

const Account = ({ accountType, balance }: Props) => {
  return (
    <Link to="/transactions">
      <Card {...accountMap[accountType]} description={`£${balance.toString()}`} />
    </Link>
  )
}

export default Account