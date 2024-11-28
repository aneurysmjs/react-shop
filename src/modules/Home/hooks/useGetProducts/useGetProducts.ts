import { useQuery } from '@tanstack/react-query';

import { getProducts } from '@/modules/home/services/productsService';
import productsAdapter from '@/modules/home/adapters/productsAdapter';

export default function useGetProducts() {
  return useQuery({
    queryFn: getProducts,
    queryKey: ['products'],
    select: productsAdapter,
  });
}
