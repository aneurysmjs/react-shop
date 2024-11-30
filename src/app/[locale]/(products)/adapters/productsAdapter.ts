import type { AxiosResponse } from 'axios';
import type { Product } from '@/app/[locale]/(products)/entities';

export default function productsAdapter(response: AxiosResponse<Product[]>) {
  return response.data;
}
