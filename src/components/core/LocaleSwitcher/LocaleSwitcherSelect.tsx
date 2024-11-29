'use client';

import clsx from 'clsx';
import { useParams } from 'next/navigation';
import { type PropsWithChildren, type FC, useTransition, useState } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { LanguageIcon } from '@heroicons/react/24/outline';

import { type Locale, usePathname, useRouter } from '@/i18n/routing';

interface LocaleSwitcherSelectProps extends PropsWithChildren {
  defaultValue: string;
  divider?: boolean;
  label?: string;
  locales: readonly Locale[];
}

const LocaleSwitcherSelect: FC<LocaleSwitcherSelectProps> = ({
  defaultValue,
  divider = false,
  label = 'Change locale',
  locales,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

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
    <div
      className={clsx(
        'relative text-gray-400',
        isPending &&
          `
            transition-opacity

            [&:disabled]:opacity-30
          `,
      )}
    >
      <Listbox value={selected} onChange={onSelectChange}>
        <Label className="sr-only">{label}</Label>
        <div className="relative">
          <ListboxButton
            className={`
              flex items-center justify-center

              focus:outline-non
            `}
          >
            <span className="sr-only">{label}</span>
            <LanguageIcon aria-hidden="true" className="h-5 w-5 text-theme" />
          </ListboxButton>

          <ListboxOptions
            transition
            className={clsx(
              `
                absolute right-0 z-10 mt-2 w-44 origin-top-right overflow-hidden
                rounded-md border-[1px] ring-1 ring-black ring-opacity-5
                bg-theme-primary shadow-lg

                dark:border-neutral-700

                data-[closed]:data-[leave]:opacity-0

                data-[leave]:transition data-[leave]:duration-100
                data-[leave]:ease-in

                focus:outline-none
              `,
              divider &&
                `
                  divide-y divide-neutral-200

                  dark:divide-neutral-600
                `,
            )}
          >
            {localeOptions.map((option) => (
              <ListboxOption
                disabled={isPending}
                key={option.title}
                value={option}
                className={`
                  group cursor-pointer select-none px-4 py-2 text-sm text-theme

                  dark:data-[focus]:bg-neutral-800 dark:data-[focus]:text-white

                  data-[focus]:bg-neutral-100 data-[focus]:text-neutral-900

                  data-[selected]:!bg-red-500
                `}
              >
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <p
                      className={`
                        font-normal

                        group-data-[selected]:font-semibold
                      `}
                    >
                      {option.title}
                    </p>
                  </div>
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};

export default LocaleSwitcherSelect;
