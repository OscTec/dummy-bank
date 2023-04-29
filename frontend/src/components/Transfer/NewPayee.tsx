const NewPayee: React.FC = () => {
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

export default NewPayee
