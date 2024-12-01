import type { FC, HTMLAttributes, ElementType } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const shellVariants = cva(
  `
    grid items-center gap-8 pb-8 pt-6

    lg:py-6
  `,
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        centered: 'container flex h-dvh max-w-2xl flex-col justify-center',
        default: 'container',
        markdown: `
          container max-w-3xl py-8

          md:py-10
        `,
        sidebar: '',
      },
    },
  },
);

interface ShellProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof shellVariants> {
  as?: ElementType;
}

const Shell: FC<ShellProps> = ({
  as: Comp = 'section',
  className,
  variant,
  ...props
}: ShellProps) => {
  return <Comp className={cn(shellVariants({ variant }), className)} {...props} />;
};

export default Shell;
