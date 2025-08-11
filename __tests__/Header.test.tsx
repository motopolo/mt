import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

jest.mock('next/navigation', () => ({ usePathname: () => '/' }));

test('renders skip to content link', () => {
  render(<Header />);
  expect(screen.getByText(/skip to content/i)).toBeInTheDocument();
});