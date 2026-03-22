import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkyControl } from '../../../components/nav/SkyControl';
import { SkyThemeContext } from '../../../contexts/SkyThemeContext';

function renderWithContext(mode, setSkyMode = jest.fn()) {
  return render(
    <SkyThemeContext.Provider value={{ mode, setSkyMode }}>
      <SkyControl />
    </SkyThemeContext.Provider>
  );
}

describe('SkyControl', () => {
  it('renders all three mode buttons', () => {
    renderWithContext('auto');
    expect(screen.getByRole('button', { name: 'Auto cycle' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Day mode' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Night mode' })).toBeInTheDocument();
  });

  it('sets aria-pressed=true only on the active mode button', () => {
    renderWithContext('day');
    expect(screen.getByRole('button', { name: 'Day mode' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Auto cycle' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: 'Night mode' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('updates aria-pressed when mode changes to night', () => {
    renderWithContext('night');
    expect(screen.getByRole('button', { name: 'Night mode' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Day mode' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls setSkyMode with the correct id when a button is clicked', async () => {
    const setSkyMode = jest.fn();
    renderWithContext('auto', setSkyMode);
    await userEvent.click(screen.getByRole('button', { name: 'Night mode' }));
    expect(setSkyMode).toHaveBeenCalledWith('night');
  });

  it('calls setSkyMode with "day" when the day button is clicked', async () => {
    const setSkyMode = jest.fn();
    renderWithContext('night', setSkyMode);
    await userEvent.click(screen.getByRole('button', { name: 'Day mode' }));
    expect(setSkyMode).toHaveBeenCalledWith('day');
  });
});
