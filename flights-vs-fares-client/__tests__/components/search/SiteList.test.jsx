import { render, screen } from '@testing-library/react';
import { SiteList } from '../../../components/search/SiteList';
import { sites } from '../../../lib/sites';

// SiteList schedules CSS animations via setTimeout — use fake timers so they
// don't bleed into other tests, but we don't need to advance them since the
// animation only mutates style, not React state.
beforeAll(() => jest.useFakeTimers());
afterAll(() => jest.useRealTimers());

describe('SiteList', () => {
  it('renders the Search Targets section label', () => {
    render(<SiteList />);
    expect(screen.getByText('Search Targets')).toBeInTheDocument();
  });

  it('renders a list container with role="list"', () => {
    render(<SiteList />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders a row for every site', () => {
    render(<SiteList />);
    for (const site of sites) {
      expect(screen.getByText(site.name)).toBeInTheDocument();
    }
  });

  it('renders exactly 8 open buttons — one per site', () => {
    render(<SiteList />);
    expect(screen.getAllByRole('button', { name: /^Open /i })).toHaveLength(8);
  });
});
