import api from '@/services/api';
import type { Product } from '@/app/[locale]/(products)/entities';

export const getProducts = () => api.get<Product[]>('/products');
