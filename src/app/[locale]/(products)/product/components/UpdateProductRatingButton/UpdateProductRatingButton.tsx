/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { type FC, useState } from 'react';
import { toast } from 'sonner';

import { showErrorToast } from '@/lib/handleError';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/button';
import Loader from '@/components/ui/shared/Loader';
import { HeartIcon } from '@heroicons/react/24/outline';

interface ProductRating {
  id: string;
  rating: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateProductRating = (product: ProductRating) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        rating: '',
      });
    }, 2000);
  });
};

interface UpdateProductRatingButtonProps extends ButtonProps {
  productId: string;
  rating: number;
}

const UpdateProductRatingButton: FC<UpdateProductRatingButtonProps> = ({
  className,
  productId,
  rating,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { error } = await updateProductRating({
      id: productId,
      rating: rating + 1,
    });

    if (error) {
      showErrorToast(error);
      return;
    }

    toast.success('Product rating updated');

    setLoading(false);
  };

  return (
    <Button
      title="Favorite"
      variant="secondary"
      size="icon"
      className={cn('size-8 shrink-0', className)}
      onClick={handleClick}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <Loader className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <HeartIcon className="size-4" aria-hidden="true" />
      )}
      <span className="sr-only">Favorite</span>
    </Button>
  );
};

export default UpdateProductRatingButton;
