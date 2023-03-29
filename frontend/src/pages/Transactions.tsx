import TransactionTable from '../components/TransactionTable'

const dummyTransactions = [
  {
    id: Math.random().toString(36).substr(2, 9),
    name: 'YouTube Premium',
    amount: -12.99,
    newBalance: 83.01,
    category: 'Entertainment',
    date: '27/03/22',
  },
]


const Transactions = () => {
  return (
    <div>
      <h1>Transactions</h1>
      <TransactionTable transactions={dummyTransactions} />
    </div>
  )
}

export default Transactions