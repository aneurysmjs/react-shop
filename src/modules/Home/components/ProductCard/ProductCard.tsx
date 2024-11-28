import type { FC } from 'react';

import type { Product } from '@/modules/home/entities';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => (
  <div className="group relative">
    <div
      className={`
        aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200

        group-hover:opacity-75

        lg:aspect-none lg:h-80
      `}
    >
      {/* <img
        src={product.imageSrc}
        alt={product.imageAlt}
        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
      /> */}

      <img
        src={product.image}
        alt={product.title}
        loading="lazy"
        className={`
          h-full w-full object-cover object-center

          lg:h-full lg:w-full
        `}
      />
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-sm theme-text">
          {/* <a href={product.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </a> */}
          <span>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </span>
        </h3>
        {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
      </div>
      <p className="text-sm font-medium theme-text">
        <strong>${product.price}</strong>
      </p>
    </div>
  </div>
);

export default ProductCard;
