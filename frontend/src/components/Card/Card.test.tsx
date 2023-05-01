import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders the title, description, and icon', () => {
    const title = 'Example Title';
    const description = 'Example Description';
    const icon = <div data-testid="test-icon" />;

    render(<Card title={title} description={description} icon={icon} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('renders a chevron icon', () => {
    const title = 'Example Title';
    const description = 'Example Description';
    const icon = <div data-testid="test-icon" />;

    render(<Card title={title} description={description} icon={icon} />);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });
});
