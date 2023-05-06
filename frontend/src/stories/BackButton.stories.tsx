import type { Meta, StoryObj } from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';

import BackButton from '../components/BackButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof BackButton> = {
  component: BackButton,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story: any) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ]
}

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
