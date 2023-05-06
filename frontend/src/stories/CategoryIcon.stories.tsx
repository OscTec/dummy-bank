import type { Meta, StoryObj } from '@storybook/react';

import CategoryIcon from '../components/CategoryIcon';

const meta: Meta<typeof CategoryIcon> = {
  component: CategoryIcon,
  tags: ['autodocs'],
  args: {
    category: 'Entertainment',
  },
  argTypes: {
    category: {
      control: 'select',
      description: 'Category icon to display',
      options: [
        'Entertainment',
        'Shopping',
        undefined,
      ],
    },
  },
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Entertainment: Story = {
  args: {
    category: 'Entertainment',
  },
};

export const Shopping: Story = {
  args: {
    category: 'Shopping',
  },
};
