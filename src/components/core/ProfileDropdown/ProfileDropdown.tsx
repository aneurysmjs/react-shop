'use client';

import type { FC } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';

import { Link } from '@/i18n/routing';

const ProfileDropdown: FC = () => {
  const t = useTranslations('common.auth');

  const mutation = useMutation({
    // mutationFn: async () => {},
    onSuccess: async () => {
      const { removeSession } = await import('@/actions/authActions');

      await removeSession();
    },
  });

  const handleSignOut = () => {
    mutation.mutate();
  };

  return (
    <Menu as="span" className="ml-3">
      <MenuButton
        className={`
          relative flex h-8 w-8 items-center justify-center rounded-full
          bg-neutral-100 text-sm

          dark:bg-neutral-800 dark:focus:ring-neutral-700
          dark:focus:ring-offset-neutral-800

          focus:outline-none focus:ring-2 focus:ring-neutral-200
          focus:ring-offset-2
        `}
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>

        <UserIcon aria-hidden="true" className="h-6 w-6" />
      </MenuButton>
      <MenuItems
        transition
        className={`
          absolute right-0 mt-2 w-48 origin-top-right rounded-md
          bg-theme-primary z-10 border-[1px] py-1 shadow-lg ring-1
          ring-neutral-700 ring-opacity-5 transition

          dark:border-neutral-700

          data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0

          data-[enter]:duration-100 data-[enter]:ease-out

          data-[leave]:duration-75 data-[leave]:ease-in

          focus:outline-none
        `}
      >
        <MenuItem>
          <Link
            href="/"
            className={`
              block px-4 py-2 text-sm text-theme

              dark:data-[focus]:bg-neutral-800

              data-[focus]:bg-neutral-100
            `}
          >
            Settings
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            type="button"
            onClick={handleSignOut}
            className={`
              block px-4 py-2 text-sm text-theme w-full text-left

              dark:data-[focus]:bg-neutral-800

              data-[focus]:bg-neutral-100
            `}
          >
            {t('signOut')}
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ProfileDropdown;
