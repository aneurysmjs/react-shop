/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-empty-function */
'use client';

import { type FC, type HTMLAttributes, useTransition } from 'react';
// import Image from 'next/image';

import { Link } from '@/i18n/routing';
import type { Product } from '@/app/[locale]/(products)/entities';
import { CheckIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
// import { toast } from 'sonner';

// import { addToCart } from '@/lib/actions/cart';
import { cn, formatPrice } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PlaceholderImage from '@/app/[locale]/(products)/components/PlaceholderImage';
import Loader from '@/components/ui/shared/Loader';

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
  product: Product;
  variant?: 'default' | 'switchable';
}

const ProductCard: FC<ProductCardProps> = ({
  className,
  isAddedToCart = false,
  onSwitch,
  product,
  variant = 'default',
  ...props
}) => {
  const [isUpdatePending, startUpdateTransition] = useTransition();

  return (
    <Card
      aria-label="product card"
      className={cn('size-full overflow-hidden rounded-lg', className)}
      {...props}
    >
      <Link aria-label={product.title} href={`/product/${product.id}`}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {/* {product.images?.length ? (
              <Image
                src={product.images[0]?.url ?? '/images/product-placeholder.webp'}
                alt="lorem"
                className="object-cover"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                fill
                loading="lazy"
              />
            ) : (
              <PlaceholderImage className="rounded-none" asChild />
            )} */}

            <PlaceholderImage className="rounded-none" asChild />
          </AspectRatio>
        </CardHeader>
        <span className="sr-only">{product.title}</span>
      </Link>
      <Link href={`/product/${product.id}`} tabIndex={-1}>
        <CardContent className="space-y-1.5 p-4">
          <CardTitle className="line-clamp-1">{product.title}</CardTitle>
          <CardDescription className="line-clamp-1">{formatPrice(product.price)}</CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-1">
        {variant === 'default' ? (
          <div className="flex w-full items-center space-x-2">
            <Button
              aria-label="Add to cart"
              size="sm"
              className="h-8 w-full rounded-sm"
              onClick={() => {
                startUpdateTransition(() => {});

                // const { error } = await addToCart({
                //   productId: product.id,
                //   quantity: 1,
                // });

                // if (error) {
                //   toast.error(error);
                // }
              }}
              disabled={isUpdatePending}
            >
              {isUpdatePending && <Loader className="mr-2 size-4 animate-spin" />}
              Add to cart
            </Button>
            <Link
              href={`/preview/product/${product.id}`}
              title="Preview"
              className={cn(
                buttonVariants({
                  className: 'h-8 w-8 shrink-0',
                  size: 'icon',
                  variant: 'secondary',
                }),
              )}
            >
              <EyeIcon className="size-4" aria-hidden="true" />
              <span className="sr-only">Preview</span>
            </Link>
          </div>
        ) : (
          <Button
            aria-label={isAddedToCart ? 'Remove from cart' : 'Add to cart'}
            size="sm"
            className="h-8 w-full rounded-sm"
            onClick={async () => {
              startUpdateTransition(async () => {});

              await onSwitch?.();
            }}
            disabled={isUpdatePending}
          >
            {isUpdatePending ? (
              <Loader className="mr-2 size-4" />
            ) : isAddedToCart ? (
              <CheckIcon className="mr-2 size-4" aria-hidden="true" />
            ) : (
              <PlusIcon className="mr-2 size-4" aria-hidden="true" />
            )}
            {isAddedToCart ? 'Added' : 'Add to cart'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
