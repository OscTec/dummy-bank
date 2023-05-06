import type { Meta, StoryObj } from '@storybook/react';

import TransactionRow from '../components/TransactionTable/TransactionRow';

const meta: Meta<typeof TransactionRow> = {
  component: TransactionRow,
  tags: ['autodocs'],
  args: {
    name: 'Music Subscription',
    amount: 9.99,
    newBalance: 129.99,
    date: '2021-01-01',
    category: 'Entertainment',
  },
  argTypes: {
    name: {
      type: {
        name: 'string',
        required: true,
      },
      description: 'Name of the transaction',
      control: 'text',
    },
    amount: {
      type: {
        name: 'number',
        required: true,
      },
      description: 'Value of transaction',
      control: 'number',
    },
    newBalance: {
      type: {
        name: 'number',
        required: true,
      },
      description: 'Account balance after transaction',
      control: 'number',
    },
    date: {
      control: 'date',
      type: {
        name: 'string',
        required: true,
      },
      description: 'Date of transaction',
    },
    category: {
      control: 'select',
      description: 'Type of the transaction',
      options: [
        'Entertainment',
        'Shopping',
        undefined,
      ],
    },
  },
  decorators: [
    (Story: any) => (
      <div className="w-full">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>New balance</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <Story />
          </tbody>
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>New balance</th>
              <th>Date</th>
            </tr>
          </tfoot>
        </table>
      </div>
    ),
  ]
}

export default meta;
type Story = StoryObj<typeof meta>;

export const EntertainmentPositive: Story = {
  args: {
    amount: 9.99,
    category: 'Entertainment',
  },
};

export const ShoppingNegative: Story = {
  args: {
    amount: -9.99,
    category: 'Shopping',
  },
};
