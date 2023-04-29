import { FormEvent } from 'react';
import Lottie from "lottie-react";
import { useState } from 'react';
import { TbCircleChevronRight } from 'react-icons/tb';

import tick from '../assets/tick.json';
import usePayees from '../hooks/usePayees';
import Payee from "../types/Payee";

const newPayee = () => {
  return (
    <div className='w-full'>
      <div>
        <label htmlFor="name" className="label">
          <span className="label-text">Payee name</span>
        </label>
        <input id="name" type="text" placeholder="Payee name" className="input input-bordered w-full max-w-xs" />
      </div>
      <div>
        <label htmlFor="account" className="label">
          <span className="label-text">Payee account number</span>
        </label>
        <input id="account" type="text" placeholder="Payee account number" className="input input-bordered w-full max-w-xs" />
      </div>
      <div>
        <label htmlFor="sort" className="label">
          <span className="label-text">Payee sort code</span>
        </label>
        <input id="sort" type="text" placeholder="Payee sort code" className="input input-bordered w-full max-w-xs" />
      </div>
    </div>
  )
}

const existingPayee = (payees: Payee[], isLoading: boolean, error: string) => {
  return (
    <div className='w-full'>
      <label htmlFor="payee" className="label">
        <span className="label-text">Payee name</span>
      </label>
      {error && <p className="text-red-500">{error}</p>}
      <select id="payee" className="select select-bordered w-full max-w-xs" defaultValue="" onChange={(e) => console.log(e.target.value)}>
        <option value="" disabled>Select Payee</option>
        {isLoading ?
          <option value="" disabled>Loading...</option> :
          payees.map((payee) => <option key={payee.id} value={payee.name}>{payee.name}</option>)
        }
      </select>
    </div>
  )
}

interface PayeeDetailsProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  payeeType: string | null;
  setPayeeType: (payeeType: string) => void;
  payees: Payee[];
  isLoading: boolean;
  error: string;
}

const PayeeDetails = ({ handleSubmit, payeeType, setPayeeType, payees, isLoading, error }: PayeeDetailsProps) => {
  return (
    <form className="form-control items-center" onSubmit={handleSubmit}>
      <div className='w-full'>
        <label htmlFor="payeeType" className="label">
          <span className="label-text">New or existing Payee?</span>
        </label>
        <select id="payeeType" className="select select-bordered w-full max-w-xs" onChange={(e) => setPayeeType(e.target.value)} defaultValue="">
          <option disabled value="">New or existing Payee?</option>
          <option value="new">New</option>
          <option value="existing">Existing</option>
        </select>
      </div>
      {payeeType === 'New' ? newPayee() : payeeType === 'Existing' ? existingPayee(payees, isLoading, error) : null}
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold mt-4 py-2 px-4 rounded-full">
        <div className="flex items-center">
          Next
          <div className="ml-2">
            <TbCircleChevronRight size={32} className="ml-auto" />
          </div>
        </div>
      </button>
    </form>
  )
}


const TransferDetails = ({ handleSubmit }: { handleSubmit: (e: FormEvent<HTMLFormElement>) => void }) => {
  return (
    <form className="form-control items-center" onSubmit={handleSubmit}>
      <div className='w-full'>
        <label htmlFor="amount" className="label">
          <span className="label-text">Amount</span>
        </label>
        <input id="amount" type="text" placeholder="Amount" className="input input-bordered w-full max-w-xs" />
      </div>
      <div className="w-full">
        <label htmlFor="date" className="label">
          <span className="label-text">Date</span>
        </label>
        <input id="date" type="date" placeholder="Date" className="input input-bordered w-full max-w-xs" />
      </div>
      <div className="w-full">
        <label htmlFor="reference" className="label">
          <span className="label-text">Reference</span>
        </label>
        <input id="reference" type="text" placeholder="Reference" className="input input-bordered w-full max-w-xs" />
      </div>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold mt-4 py-2 px-4 rounded-full">
        <div className="flex items-center">
          SEND
        </div>
      </button>
    </form>
  )
}

const Sending = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-32 h-32">
          <Lottie animationData={tick} loop={true} />
        </div>
      </div>
      <div className="flex justify-center text-xl font-bold mt-4">
        Sent
      </div>
    </>
  )
}

const Transfer: React.FC = () => {
  const [payeeType, setPayeeType] = useState<null | string>(null)
  const { data: payees, isLoading, error } = usePayees()
  const [showDetails, setShowDetails] = useState(false)
  const [sending, setSending] = useState<null | Boolean>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowDetails(true)
    console.log('Submitted')
  }

  const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowDetails(false)
    setSending(true)
    console.log('Submitted')
  }

  return (
    <div className="flex justify-center p-5">
      <div className="card card-bordered border-cyan-500 p-5 w-96 bor">
        {sending ? null : showDetails ?
          <TransferDetails handleSubmit={handleDetailsSubmit} /> :
          <PayeeDetails
            handleSubmit={handleSubmit}
            payeeType={payeeType}
            setPayeeType={setPayeeType}
            payees={payees}
            isLoading={isLoading}
            error={error} />}
        {sending && <Sending />}
      </div>
    </div>
  )
}

export default Transfer
