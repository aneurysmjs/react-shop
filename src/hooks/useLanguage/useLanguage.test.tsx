/* eslint-disable @typescript-eslint/require-await */
import { describe, test, vi, expect, beforeEach } from 'vitest';

import { renderHook } from '@testing-library/react';
import { act } from 'react';

import useLanguage from './useLanguage';

beforeEach(() => {
  localStorage.clear();
});

describe('useLanguage', () => {
  test('it should default to "en"', () => {
    expect(localStorage.getItem('i18nextLng')).toBeNull();

    const { result } = renderHook(() => useLanguage());
    const [lang] = result.current;

    expect(lang).toBe('en');
    expect(localStorage.getItem('i18nextLng')).toBe('en');
  });

  test('it should change the language', async () => {
    expect(localStorage.getItem('i18nextLng')).toBeNull();

    const { result } = renderHook(() => useLanguage());
    const [enLang, setLang] = result.current;

    expect(enLang).toBe('en');
    expect(localStorage.getItem('i18nextLng')).toBe('en');

    // we use it to resolve the promise that is handle inside the hook.
    await act(async () => {
      setLang('ru');
    });

    const [ruLang] = result.current;

    expect(ruLang).toBe('ru');
    expect(localStorage.getItem('i18nextLng')).toBe('ru');

    await act(async () => {
      setLang('es');
    });

    const [esLang] = result.current;

    expect(esLang).toBe('es');
    expect(localStorage.getItem('i18nextLng')).toBe('es');
  });

  test('it should call `callback` after language change', async () => {
    const onLangChangedSpy = vi.fn();

    expect(localStorage.getItem('i18nextLng')).toBeNull();

    const { result } = renderHook(() => useLanguage(onLangChangedSpy));

    const [lang, setLang] = result.current;

    expect(lang).toBe('en');

    await act(async () => {
      setLang('ru');
    });

    const [currentLang] = result.current;

    expect(currentLang).toBe('ru');
    expect(localStorage.getItem('i18nextLng')).toBe('ru');
    expect(onLangChangedSpy).toHaveBeenCalledTimes(1);
  });
});
