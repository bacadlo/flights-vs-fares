import { renderHook } from '@testing-library/react';
import { SkyThemeProvider, useSkyThemeContext } from '../../contexts/SkyThemeContext';

// useSkyTheme drives a 50ms setInterval and reads live DOM elements — mock it
// so these tests stay fast and self-contained.
jest.mock('../../hooks/useSkyTheme', () => ({
  useSkyTheme: jest.fn(() => ({ mode: 'day', setSkyMode: jest.fn() })),
}));

describe('useSkyThemeContext', () => {
  it('throws when called outside SkyThemeProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useSkyThemeContext())).toThrow(
      'useSkyThemeContext must be used within SkyThemeProvider'
    );
    consoleSpy.mockRestore();
  });

  it('returns mode and setSkyMode when inside SkyThemeProvider', () => {
    const { result } = renderHook(() => useSkyThemeContext(), {
      wrapper: SkyThemeProvider,
    });
    expect(result.current.mode).toBe('day');
    expect(typeof result.current.setSkyMode).toBe('function');
  });
});
