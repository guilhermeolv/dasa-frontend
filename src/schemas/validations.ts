import { z } from 'zod';

export const productSchema = z.object({
  title: z.string()
    .min(3, 'Título deve ter no mínimo 3 caracteres')
    .max(30, 'Título deve ter no máximo 30 caracteres'),
  description: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(200, 'Descrição deve ter no máximo 200 caracteres'),
  price: z.number()
    .min(0, 'Preço não pode ser negativo')
    .transform(val => Number(val.toFixed(2))),
});

export const categorySchema = z.object({
  title: z.string()
    .min(3, 'Título deve ter no mínimo 3 caracteres')
    .max(30, 'Título deve ter no máximo 30 caracteres'),
  description: z.string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(100, 'Descrição deve ter no máximo 100 caracteres')
}); 