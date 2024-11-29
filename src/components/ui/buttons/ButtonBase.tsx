import type { PropsWithChildren, ComponentProps, FC } from 'react';
import clsx from 'clsx';
import { Button } from '@headlessui/react';
import Loader from '@/components/ui/shared/Loader';

type ButtonBaseSizes = 'lg' | 'md' | 'sm' | 'xl' | 'xs';
type ButtonBaseColors = 'danger' | 'info' | 'primary' | 'secondary' | 'success' | 'warning';

type ButtonProps = ComponentProps<typeof Button>;

interface ButtonBaseProps extends ButtonProps {
  color?: ButtonBaseColors;
  href?: string;
  isLoading?: boolean;
  outlined?: boolean;
  size?: ButtonBaseSizes;
}

const sizesMap = new Map<ButtonBaseSizes, string>([
  ['xs', 'rounded px-2 py-1 text-xs'],
  ['sm', 'rounded px-2 py-1 text-sm'],
  ['md', 'rounded-md px-2.5 py-1.5 text-sm'],
  ['lg', 'rounded-md px-3 py-2 text-sm'],
  ['xl', 'rounded-md px-3.5 py-2.5 text-sm'],
]);

const buttonBaseColorsMap = new Map<ButtonBaseColors, string>([
  [
    'primary',
    'bg-sky-400 dark:bg-blue-600 dark:hover:bg-blue-500 focus-visible:outline-blue-500 hover:bg-sky-300',
  ],
  [
    'secondary',
    'bg-white dark:bg-neutral-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 text-theme',
  ],
]);

const ButtonBase: FC<PropsWithChildren<ButtonBaseProps>> = ({
  as = 'button',
  // outlined = false,
  children,
  color = 'primary',
  isLoading = false,
  size = 'md',
  ...props
}) => {
  const buttonSize = sizesMap.get(size);
  const buttonColor = buttonBaseColorsMap.get(color);

  return (
    <>
      <Button
        as={as}
        className={clsx(
          buttonSize,
          buttonColor,
          `
            font-semibold shadow-sm

            focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2
          `,
        )}
        {...props}
      >
        {isLoading && (
          <span className="-ml-6 mr-2 flex items-center">
            <Loader size="sm" />
          </span>
        )}
        {children}
      </Button>
    </>
  );
};

export default ButtonBase;
