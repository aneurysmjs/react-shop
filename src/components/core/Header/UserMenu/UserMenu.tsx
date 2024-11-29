import type { FC } from 'react';

import LocaleSwitcher from '@/components/core/LocaleSwitcher';
import ThemeSwitch from '@/components/core/ThemeSwitch';

const UserMenu: FC = () => {
  return (
    <>
      <ThemeSwitch className="mr-2" />
      <LocaleSwitcher />
    </>
  );
};

export default UserMenu;
