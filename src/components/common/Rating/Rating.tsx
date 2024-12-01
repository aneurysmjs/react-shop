import type { FC } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';

import { cn } from '@/lib/utils';

interface RatingProps {
  rating: number;
}

const Rating: FC<RatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          // eslint-disable-next-line readable-tailwind/multiline
          className={cn('size-4', rating >= i + 1 ? 'text-yellow-500' : 'text-muted-foreground')}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default Rating;
