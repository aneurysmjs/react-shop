'use client';

import { useParams } from 'next/navigation';
import { type PropsWithChildren, type FC, useTransition, useState } from 'react';
import { LanguageIcon } from '@heroicons/react/24/outline';

import { type Locale, usePathname, useRouter } from '@/i18n/routing';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LocaleSwitcherSelectProps extends PropsWithChildren {
  defaultValue: string;
  locales: readonly Locale[];
}

const LocaleSwitcherSelect: FC<LocaleSwitcherSelectProps> = ({ defaultValue, locales }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState(() => ({ title: defaultValue }));

  const localeOptions = locales.map((locale) => ({
    title: locale,
  }));

  function onSelectChange(option: { title: Locale }) {
    const nextLocale = option.title;

    setSelected({ title: nextLocale });

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { params, pathname },
        { locale: nextLocale },
      );
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <LanguageIcon aria-hidden="true" className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {localeOptions.map((option) => (
          <DropdownMenuItem
            disabled={isPending}
            key={option.title}
            onClick={() => {
              onSelectChange(option);
            }}
          >
            {option.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitcherSelect;
