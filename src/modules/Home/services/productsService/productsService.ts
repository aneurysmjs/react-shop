import api from '@/services/api';
import type { Product } from '@/modules/home/entities';

export const getProducts = () => api.get<Product[]>('/products');
