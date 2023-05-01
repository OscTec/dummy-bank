import { render } from '@testing-library/react'
import TransactionTable from './TransactionTable'

describe('TransactionTable', () => {
  test('renders transaction rows when not loading', async () => {
    const transactions = [
      { id: '1', name: 'Transaction 1', amount: 100, newBalance: 199.99, date: '04/30/2023' },
      { id: '2', name: 'Transaction 2', amount: 198.99, newBalance: 400, date: '04/29/2023' }
    ]
    const { findByText } = render(<TransactionTable transactions={transactions} isLoading={false} />)

    expect(await findByText('Transaction 1')).toBeInTheDocument()
    expect(await findByText('100')).toBeInTheDocument()
    expect(await findByText('199.99')).toBeInTheDocument()
    expect(await findByText('04/30/2023')).toBeInTheDocument()

    expect(await findByText('Transaction 2')).toBeInTheDocument()
    expect(await findByText('198.99')).toBeInTheDocument()
    expect(await findByText('400')).toBeInTheDocument()
    expect(await findByText('04/29/2023')).toBeInTheDocument()
  })

  test('renders skeleton rows when loading', () => {
    const { getAllByTestId } = render(<TransactionTable transactions={[]} isLoading={true} />)
    const skeletonRows = getAllByTestId('transaction-row-skeleton')

    expect(skeletonRows.length).toBe(5)
  })
})
