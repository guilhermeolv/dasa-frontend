import { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import { z } from "zod";
import { useValidation } from "../hooks/useValidation";
import { useSelectOptions } from "../hooks/useSelectOptions";

interface BaseItem {
    id: number;
    categoryId?: number;
    category?: { id: number } | number;
}

interface ServiceInterface<T> {
    getAll: () => Promise<{ data: T[] }>;
    create: (item: T) => Promise<any>;
    update: (id: number, item: T) => Promise<any>;
    delete: (id: number) => Promise<any>;
}

interface DataTableContainerProps<T> {
    title: string;
    service: ServiceInterface<T>;
    columns: Array<{ field: string, key: string, editable: boolean, type?: string, options?: {
        service: ServiceInterface<any>;
        labelKey: string;
        valueKey: string;
    }, validation?: z.ZodType<any> }>;
    schema?: z.ZodType<T>;
}

export function DataTableContainer<T extends BaseItem>({ title, service, columns, schema }: DataTableContainerProps<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newItem, setNewItem] = useState<Partial<T>>({});
    const [editingItem, setEditingItem] = useState<Partial<T>>({});

    const { errors, validateField, validateItem } = useValidation<T>(schema);
    const { selectOptions, loadSelectOptions } = useSelectOptions(columns);

    const handleAdd = () => {
        setIsAddingNew(true);
        setNewItem({});
        loadSelectOptions();
    };

    const handleEdit = (id: number) => {
        const item = items.find(i => i.id === id);
        if (item) {
            setEditingId(id);
            setEditingItem({ ...item });
            loadSelectOptions();
        }
    };

    const handleSaveEdit = async () => {
        if (!editingId || !validateItem(editingItem as T)) return;

        try {
            setLoading(true);
            const response = await service.update(editingId, editingItem as T);
            setItems(prev => prev.map(item => 
                item.id === editingId ? response.data : item
            ));
            setEditingId(null);
            setEditingItem({});
            await loadSelectOptions();
        } catch (error) {
            console.error('Erro ao atualizar item:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNew = async () => {
        if (!validateItem(newItem as T)) return;
        try {
            setLoading(true);
            const itemToSave = {
                ...newItem,
                categoryId: typeof newItem.category === 'object' ? newItem.category?.id : newItem.category
            } as unknown as T;
            
            const response = await service.create(itemToSave);
            setItems(prev => [...prev, response.data]);
            setIsAddingNew(false);
            setNewItem({});
            await loadSelectOptions();
        } catch (error) {
            console.error('Erro ao criar item:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            setLoading(true);
            await service.delete(id);
            setItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error('Erro ao deletar item:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (isAddingNew) {
            setIsAddingNew(false);
            setNewItem({});
        } else if (editingId) {
            setEditingId(null);
            setEditingItem({});
        }
    };

    const handleFieldChange = (key: string, value: any) => {
        const column = columns.find(col => col.key === key);
        validateField(key, value, column?.validation);
        if (isAddingNew) {
            setNewItem(prev => {
                const newItem = { ...prev, [key]: value };
                console.log('newItem', newItem);
                return newItem;
            });
        } else {
            setEditingItem(prev => {
                const updatedItem = { ...prev, [key]: value };
                console.log('editingItem', updatedItem);
                return updatedItem;
            });
        }
    };

    useEffect(() => {
        const loadItems = async () => {
            try {
                setLoading(true);
                const response = await service.getAll();
                setItems(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, []);

    return (
        <DataTable<T>
            title={title}
            columns={columns}
            data={[
                ...(isAddingNew ? [{ id: 0, ...newItem, isNew: true }] : []),
                ...items.map(item => ({
                    ...item,
                    ...(item.id === editingId ? editingItem : {}),
                    isEditing: item.id === editingId
                }))
            ]}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSave={isAddingNew ? handleSaveNew : handleSaveEdit}
            onCancel={handleCancel}
            onFieldChange={handleFieldChange}
            loading={loading}
            isAddingNew={isAddingNew}
            editingId={editingId}
            selectOptions={selectOptions}
            errors={errors}
        />
    );
}