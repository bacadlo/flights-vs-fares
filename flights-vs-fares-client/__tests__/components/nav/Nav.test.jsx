import { render, screen } from '@testing-library/react';
import { Nav } from '../../../components/nav/Nav';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, className, 'aria-label': ariaLabel, 'aria-current': ariaCurrent }) => (
    <a href={href} className={className} aria-label={ariaLabel} aria-current={ariaCurrent}>
      {children}
    </a>
  ),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Isolate Nav from the sky theme system.
jest.mock('../../../components/nav/SkyControl', () => ({
  SkyControl: () => <div data-testid="sky-control" />,
}));

const { usePathname } = require('next/navigation');

describe('Nav', () => {
  beforeEach(() => {
    usePathname.mockReturnValue('/');
  });

  it('renders the logo link with an accessible label', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: 'FlightsVsFares home' })).toBeInTheDocument();
  });

  it('renders all three navigation tabs', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Tips' })).toBeInTheDocument();
  });

  it('applies nav-tab--active to the current path tab', () => {
    usePathname.mockReturnValue('/search');
    render(<Nav />);
    expect(screen.getByRole('link', { name: 'Search' })).toHaveClass('nav-tab--active');
  });

  it('does not apply nav-tab--active to inactive tabs', () => {
    usePathname.mockReturnValue('/search');
    render(<Nav />);
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveClass('nav-tab--active');
    expect(screen.getByRole('link', { name: 'Tips' })).not.toHaveClass('nav-tab--active');
  });

  it('sets aria-current="page" on the active tab', () => {
    usePathname.mockReturnValue('/tips');
    render(<Nav />);
    expect(screen.getByRole('link', { name: 'Tips' })).toHaveAttribute('aria-current', 'page');
  });

  it('does not set aria-current on inactive tabs', () => {
    usePathname.mockReturnValue('/tips');
    render(<Nav />);
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'Search' })).not.toHaveAttribute('aria-current');
  });

  it('renders the SkyControl', () => {
    render(<Nav />);
    expect(screen.getByTestId('sky-control')).toBeInTheDocument();
  });
});
