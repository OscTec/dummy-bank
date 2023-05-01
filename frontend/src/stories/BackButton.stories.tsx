import type { Meta, StoryObj } from '@storybook/react';

import BackButton from '../components/BackButton';
import { BrowserRouter } from 'react-router-dom';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/BackButton',
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
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
};
