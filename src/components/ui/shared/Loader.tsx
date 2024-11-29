import type { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

type LoaderSizes = 'lg' | 'md' | 'sm';

const loaderSizes = new Map<LoaderSizes, string>([
  ['sm', 'h-4 w-4'],
  ['md', 'h-8 w-8'],
  ['lg', 'h-12 w-12'],
]);

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: LoaderSizes;
}

const Loader: FC<LoaderProps> = ({ size = 'md', ...props }) => {
  const loaderSize = loaderSizes.get(size);

  return (
    <div
      aria-label="Loading"
      role="status"
      className={clsx(
        `
          box-border inline-block animate-spin rounded-full border-4
          border-white border-b-transparent
        `,
        loaderSize,
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
