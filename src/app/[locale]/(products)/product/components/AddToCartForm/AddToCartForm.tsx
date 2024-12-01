/* eslint-disable @typescript-eslint/no-misused-promises */
'use client';

import { useId, useState, type FC } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

// import { addToCart } from '@/lib/actions/cart';
import { showErrorToast } from '@/lib/handleError';
import { cn } from '@/lib/utils';
import { updateCartItemSchema } from '@/lib/validations/cart';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Loader from '@/components/ui/shared/Loader';

interface AddToCartFormProps {
  productId: string;
  showBuyNow?: boolean;
}

type Inputs = z.infer<typeof updateCartItemSchema>;

interface AddToCart {
  productId: string;
  quantity: number;
}

// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
const addToCart = async (cart: AddToCart) => {
  return {
    error: '',
  };
};

const AddToCartForm: FC<AddToCartFormProps> = ({ productId, showBuyNow }) => {
  const id = useId();
  const router = useRouter();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const form = useForm<Inputs>({
    defaultValues: {
      quantity: 1,
    },
    resolver: zodResolver(updateCartItemSchema),
  });

  async function onSubmit(data: Inputs) {
    setIsAddingToCart(true);
    const { error } = await addToCart({
      productId,
      quantity: +data.quantity,
    });

    if (error) {
      showErrorToast(error);
      return;
    }

    toast.success('Product added to cart');

    setIsAddingToCart(false);
  }

  return (
    <Form {...form}>
      <form
        // eslint-disable-next-line readable-tailwind/multiline
        className={cn('flex max-w-[260px] gap-4', showBuyNow ? 'flex-col' : `flex-row`)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center">
          <Button
            id={`${id}-decrement`}
            type="button"
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-r-none"
            onClick={() => {
              form.setValue('quantity', Math.max(0, form.getValues('quantity') - 1));
            }}
            disabled={isAddingToCart}
          >
            <MinusIcon className="size-3" aria-hidden="true" />
            <span className="sr-only">Remove one item</span>
          </Button>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    className="h-8 w-16 rounded-none border-x-0"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const parsedValue = parseInt(value, 10);
                      if (isNaN(parsedValue)) return;
                      field.onChange(parsedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            id={`${id}-increment`}
            type="button"
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-l-none"
            onClick={() => {
              form.setValue('quantity', +form.getValues('quantity') + 1);
            }}
            disabled={isAddingToCart}
          >
            <PlusIcon className="size-3" aria-hidden="true" />
            <span className="sr-only">Add one item</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2.5">
          {showBuyNow ? (
            <Button
              type="button"
              aria-label="Buy now"
              size="sm"
              className="w-full"
              onClick={async () => {
                setIsBuyingNow(true);

                const { error } = await addToCart({
                  productId,
                  quantity: +form.getValues('quantity'),
                });

                if (error) {
                  showErrorToast(error);
                  return;
                }

                router.push('/cart');
                setIsBuyingNow(false);
              }}
              disabled={isBuyingNow}
            >
              {isBuyingNow && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              Buy now
            </Button>
          ) : null}
          <Button
            aria-label="Add to cart"
            type="submit"
            variant={showBuyNow ? 'outline' : 'default'}
            size="sm"
            className="w-full"
            disabled={isAddingToCart}
          >
            {isAddingToCart && <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
            Add to cart
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddToCartForm;
