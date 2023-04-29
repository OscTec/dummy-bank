import { FormEvent } from 'react';
import { TbCircleChevronRight } from 'react-icons/tb';

import NewPayee from '../Transfer/NewPayee';
import ExistingPayee from '../Transfer/ExistingPayee';

import Payee from "../../types/Payee";

interface PayeeDetailsProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  payeeType: string | null;
  setPayeeType: (payeeType: string) => void;
  payees: Payee[];
  isLoading: boolean;
  error: string;
}

const PayeeDetails: React.FC<PayeeDetailsProps> = ({ onSubmit, payeeType, setPayeeType, payees, isLoading, error }) => {
  return (
    <form className="form-control items-center" onSubmit={onSubmit}>
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
      {payeeType === 'New' ? <NewPayee /> : payeeType === 'Existing' ? <ExistingPayee payees={payees} isLoading={isLoading} error={error} /> : null}
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

export default PayeeDetails
