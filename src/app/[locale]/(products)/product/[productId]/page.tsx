import type { FC } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import AddToCartForm from '@/app/[locale]/(products)/product/components/AddToCartForm';
import Rating from '@/components/common/Rating';
import UpdateProductRatingButton from '@/app/[locale]/(products)/product/components/UpdateProductRatingButton';
import ProductImageCarousel from '@/app/[locale]/(products)/components/ProductImageCarousel';
import Shell from '@/components/common/Shell';

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: FC<ProductPageProps> = ({ params }) => {
  const productId = decodeURIComponent(params.productId);

  const product = {
    description: null,
    id: '1',
    images: [],
    inventory: 10,
    name: 'foo',
    price: 15.0,
    rating: 3,
  };

  // const product = await db.query.products.findFirst({
  //   columns: {
  //     description: true,
  //     id: true,
  //     images: true,
  //     inventory: true,
  //     name: true,
  //     price: true,
  //     rating: true,
  //     storeId: true,
  //   },
  //   where: eq(products.id, productId),
  //   with: {
  //     category: true,
  //   },
  // });

  // if (!product) {
  //   notFound();
  // }

  // const store = await db.query.stores.findFirst({
  //   columns: {
  //     id: true,
  //     name: true,
  //   },
  //   where: eq(stores.id, product.storeId),
  // });

  // const otherProducts = store
  //   ? await db
  //       .select({
  //         category: categories.name,
  //         id: products.id,
  //         images: products.images,
  //         inventory: products.inventory,
  //         name: products.name,
  //         price: products.price,
  //         rating: products.rating,
  //       })
  //       .from(products)
  //       .leftJoin(categories, eq(products.categoryId, categories.id))
  //       .limit(4)
  //       .where(and(eq(products.storeId, product.storeId), not(eq(products.id, productId))))
  //       .orderBy(desc(products.inventory))
  //   : [];

  return (
    <Shell
      className={`
        pb-12

        md:pb-14
      `}
    >
      <div
        className={`
          flex flex-col gap-8

          md:flex-row md:gap-16
        `}
      >
        <ProductImageCarousel
          className={`
            w-full

            md:w-1/2
          `}
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          images={product.images ?? []}
          options={{
            loop: true,
          }}
        />
        <Separator
          className={`
            mt-4

            md:hidden
          `}
        />
        <div
          className={`
            flex w-full flex-col gap-4

            md:w-1/2
          `}
        >
          <div className="space-y-2">
            <h2 className="line-clamp-1 text-2xl font-bold">{product.name}</h2>
            <p className="text-base text-muted-foreground">{formatPrice(product.price)}</p>
            {/* {store ? (
              <Link
                href={`/products?store_ids=${store.id}`}
                className={`
                  line-clamp-1 inline-block text-base text-muted-foreground

                  hover:underline
                `}
              >
                {store.name}
              </Link>
            ) : null} */}
          </div>
          <Separator className="my-1.5" />
          <p className="text-base text-muted-foreground">{product.inventory} in stock</p>
          <div className="flex items-center justify-between">
            <Rating rating={Math.round(product.rating / 5)} />
            <UpdateProductRatingButton productId={product.id} rating={product.rating} />
          </div>
          <AddToCartForm productId={productId} showBuyNow={true} />
          <Separator className="mt-5" />
          <Accordion type="single" collapsible className="w-full" defaultValue="description">
            <AccordionItem value="description" className="border-none">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
                {product.description ?? 'No description is available for this product.'}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="md:hidden" />
        </div>
      </div>
    </Shell>
  );
};

export default ProductPage;
