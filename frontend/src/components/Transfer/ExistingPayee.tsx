import Payee from "../../types/Payee"

interface Props {
  payees: Payee[];
  isLoading: boolean;
  error: string;
}

const ExistingPayee: React.FC<Props> = ({ payees, isLoading, error }) => {
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

export default ExistingPayee
