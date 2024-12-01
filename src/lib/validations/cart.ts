import * as z from 'zod';

export const updateCartItemSchema = z.object({
  quantity: z.number().min(0).default(1),
});
