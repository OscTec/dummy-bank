import { FormEvent } from "react"

const TransferDetails = ({ onSubmit }: { onSubmit: (e: FormEvent<HTMLFormElement>) => void }) => {
  return (
    <form className="form-control items-center" onSubmit={onSubmit}>
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

export default TransferDetails
