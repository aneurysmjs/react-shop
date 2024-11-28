/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, useEffect } from 'react';
import { isNil } from 'ramda';
import i18n from 'i18next';

export const getLang = () => localStorage.getItem('i18nextLng');

/**
 *
 * @param onLangChanged callback will be called as soon translations were loaded
 * @returns [string, () => void]
 */
export default function useLanguage(
  onLangChanged = () => {},
): [null | string, (lang: string) => void] {
  const [lang, setLang] = useState(getLang());

  useEffect(() => {
    if (isNil(lang)) {
      localStorage.setItem('i18nextLng', i18n.language);
      setLang(i18n.language);
    }
  }, [lang]);

  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n
        .changeLanguage(lang)
        .then(() => {
          localStorage.setItem('i18nextLng', lang);
          onLangChanged();
        })
        .catch((reason: unknown) => {
          console.error(reason);
        });
    }
  }, [lang, onLangChanged]);

  return [lang, setLang];
}
