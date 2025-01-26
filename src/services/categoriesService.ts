import { api } from './api';
import { Category } from '../types/Category';
import { MOCK_USER } from '../constants/user';
export const categoriesService = {
    getAll: () => api.get<Category[]>('/categories/owner/' + MOCK_USER.id),
    getById: (id: number) => api.get<Category>(`/categories/${id}`),
    create: (category: Category) => api.post('/categories', { ...category, ownerId: MOCK_USER.id }),
    update: (id: number, category: Category) => api.put(`/categories/${id}`, category),
    delete: (id: number) => api.delete(`/categories/${id}`)
};