import { api } from './api';
import { Product } from '../types/Product';
import { MOCK_USER } from '../constants/user';
export const productsService = {
    getAll: () => api.get<Product[]>('/products/owner/' + MOCK_USER.id),
    getById: (id: number) => api.get<Product>(`/products/${id}`),
    create: (product: Product) => api.post('/products', { ...product, ownerId: MOCK_USER.id }),
    update: (id: number, product: Product) => api.put(`/products/${id}`, product),
    delete: (id: number) => api.delete(`/products/${id}`)
};