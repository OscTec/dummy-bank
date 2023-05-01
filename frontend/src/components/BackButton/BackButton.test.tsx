import { render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import BackButton from './BackButton';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('BackButton', () => {
  it('should render the BackButton component', () => {
    const { getByText } = render(<BackButton />);
    const button = getByText('Back');
    expect(button).toBeInTheDocument();
  });

  it('should call the navigate function when the button is clicked', () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { getByText } = render(<BackButton />);
    const button = getByText('Back');
    button.click();
    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
