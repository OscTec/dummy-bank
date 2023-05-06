import type { Meta, StoryObj } from '@storybook/react';

import { AiOutlineStock } from 'react-icons/ai';
import { BsCash, BsCreditCard } from 'react-icons/bs';
import { CiVault } from 'react-icons/ci';
import { GiCash } from 'react-icons/gi';

import Card from '../components/Card';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  args: {
    title: 'Card Title',
    description: 'Card body',
    icon: 'Current Account',
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: {
      control: 'select',
      options: [
        'Current Account',
        'Credit Account',
        'Savings Account',
        'Cash ISA',
        'S&S ISA'
      ],
      mapping: {
        'Current Account': <BsCash size={32} />,
        'Credit Account': <BsCreditCard size={32} />,
        'Savings Account': <CiVault size={32} />,
        'Cash ISA': <GiCash size={32} />,
        'S&S ISA': <AiOutlineStock size={32} />
      }
    },
  },
}

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
