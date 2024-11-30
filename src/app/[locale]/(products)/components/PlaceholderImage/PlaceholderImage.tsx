import type { FC, ComponentPropsWithoutRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { PhotoIcon } from '@heroicons/react/24/outline';
import type { ClassValue } from 'clsx';

import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

interface PlaceholderImageProps extends ComponentPropsWithoutRef<typeof AspectRatio> {
  asChild?: boolean;

  isSkeleton?: boolean;
}

const PlaceholderImage: FC<PlaceholderImageProps> = ({
  asChild = false,
  className = '',
  isSkeleton = false,
  ...props
}) => {
  const Comp = asChild ? Slot : AspectRatio;

  return (
    <Comp
      ratio={16 / 9}
      {...props}
      className={cn('overflow-hidden rounded-lg', className as ClassValue)}
    >
      <Skeleton
        aria-label="Placeholder"
        role="img"
        aria-roledescription="placeholder"
        className={cn(
          'flex size-full items-center justify-center',
          isSkeleton ? 'animate-pulse' : 'animate-none',
        )}
      >
        <PhotoIcon className="size-9 text-muted-foreground" aria-hidden="true" />
      </Skeleton>
    </Comp>
  );
};

export default PlaceholderImage;
