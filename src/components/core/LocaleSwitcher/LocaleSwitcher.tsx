import { useLocale } from 'next-intl';

import { routing } from '@/i18n/routing';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const locale = useLocale();

  return <LocaleSwitcherSelect defaultValue={locale} locales={routing.locales} />;
}
