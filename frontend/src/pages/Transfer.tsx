import { useState } from 'react';

import tick from '../assets/tick.json';

import usePayees from '../hooks/usePayees';

import PayeeDetails from '../components/Transfer/PayeeDetails';
import LottieAnimation from '../components/common/LottieAnimation';
import TransferDetails from '../components/Transfer/TransferDetails';

const Transfer: React.FC = () => {
  const { data: payees, isLoading, error } = usePayees()
  const [payeeType, setPayeeType] = useState<null | string>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [sending, setSending] = useState<null | boolean>(null)

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
        {sending ? (
          <LottieAnimation text={'Sent'} animationData={tick} />
        ) : showDetails ? (
          <TransferDetails onSubmit={handleDetailsSubmit} />
        ) : (
          <PayeeDetails
            onSubmit={handleSubmit}
            payeeType={payeeType}
            setPayeeType={setPayeeType}
            payees={payees}
            isLoading={isLoading}
            error={error}
          />
        )}
      </div>
    </div>
  )
}

export default Transfer
