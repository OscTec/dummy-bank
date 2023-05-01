import type { Meta, StoryObj } from '@storybook/react';

import { AiOutlineStock } from 'react-icons/ai';
import { BsCash, BsCreditCard } from 'react-icons/bs';
import { CiVault } from 'react-icons/ci';
import { GiCash } from 'react-icons/gi';

import Card from '../components/Card';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: {
      control: {
        type: 'select',
        options: [
          <BsCash size={32} />,
          <BsCreditCard size={32} />,
          <CiVault size={32} />,
          <GiCash size={32} />,
          <AiOutlineStock size={32} />
        ],
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    title: 'Card Title',
    description: 'This is the description for the card component.',
    icon: <BsCash size={32} />,
  },
};
