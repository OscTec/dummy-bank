import { render, screen } from '@testing-library/react'
import TransactionRow from './TransactionRow'

describe('TransactionRow', () => {
  it('should render the entertainment category icon', () => {
    const transaction = {
      id: '1',
      name: 'Music Subscription',
      amount: -10,
      newBalance: 100,
      category: 'Entertainment',
      date: '2022-04-30',
    }

    render(
      <table>
        <tbody>
          <TransactionRow {...transaction} />
        </tbody>
      </table>
    )

    const nameElement = screen.getByText('Music Subscription')
    const iconElement = screen.getByTestId('entertainment-icon')

    expect(nameElement).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toBeVisible();
  })

  it('should render the shopping category icon', () => {
    const transaction = {
      id: '1',
      name: 'Clothes Shop',
      amount: -10,
      newBalance: 100,
      category: 'Shopping',
      date: '2022-04-30',
    }

    render(
      <table>
        <tbody>
          <TransactionRow {...transaction} />
        </tbody>
      </table>
    )

    const nameElement = screen.getByText('Clothes Shop')
    const iconElement = screen.getByTestId('shopping-icon')

    expect(nameElement).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toBeVisible();
  })

  it('should render the default category icon', () => {
    const transaction = {
      id: '1',
      name: 'Secret Category',
      amount: -10,
      newBalance: 100,
      category: 'Misc',
      date: '2022-04-30',
    }

    render(
      <table>
        <tbody>
          <TransactionRow {...transaction} />
        </tbody>
      </table>
    )

    const nameElement = screen.getByText('Secret Category')
    const iconElement = screen.getByTestId('entertainment-icon')

    expect(nameElement).toBeInTheDocument()
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toBeVisible();
  })

  it('should render the amount in red if it is negative', () => {
    const transaction = {
      id: '1',
      name: 'Music Subscription',
      amount: -50,
      newBalance: 100,
      category: 'Entertainment',
      date: '2022-04-30',
    }

    const { getByText } = render(
      <table>
        <tbody>
          <TransactionRow {...transaction} />
        </tbody>
      </table>
    )

    const amount = getByText('-50')
    expect(amount).toHaveClass('text-red-500')
  })

  it('should render the amount in green if it is positive', () => {
    const transaction = {
      id: '1',
      name: 'Music Subscription',
      amount: 20,
      newBalance: 100,
      category: 'Entertainment',
      date: '2022-04-30',
    }

    const { getByText } = render(
      <table>
        <tbody>
          <TransactionRow {...transaction} />
        </tbody>
      </table>
    )

    const amount = getByText('20')
    expect(amount).toHaveClass('text-green-500')
  })
})
