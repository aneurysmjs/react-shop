import type { AxiosResponse } from 'axios';
import type { Product } from '@/modules/home/entities';

export default function productsAdapter(response: AxiosResponse<Product[]>) {
  console.log('response', JSON.stringify(response, null, 2));
  return response;
}
