import { useState, useEffect } from "react";
import { DataTable } from "./DataTable";

interface BaseItem {
    id: number;
    [key: string]: any
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
    columns: Array<{ field: string, key: string, editable: boolean, type?: string }>;
}

export function DataTableContainer<T extends BaseItem>({ title, service, columns }: DataTableContainerProps<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newItem, setNewItem] = useState<Partial<T>>({});
    const [editingItem, setEditingItem] = useState<Partial<T>>({});

    const handleAdd = () => {
        setIsAddingNew(true);
        setNewItem({});
    };

    const handleEdit = (id: number) => {
        const item = items.find(i => i.id === id);
        if (item) {
            setEditingId(id);
            setEditingItem({ ...item });
        }
    };

    const handleSaveEdit = async () => {
        if (!editingId) return;

        try {
            setLoading(true);
            await service.update(editingId, editingItem as T);
            await loadItems();
            setEditingId(null);
            setEditingItem({});
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditingChange = (key: string, value: any) => {
        setEditingItem(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSaveNew = async () => {
        try {
            setLoading(true);
            await service.create(newItem as T);
            await loadItems();
            setIsAddingNew(false);
            setNewItem({});
        } catch (error) {
            console.error('Erro ao criar item:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewItemChange = (key: string, value: any) => {
        setNewItem(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleDelete = async (id: number) => {
        try {
            setLoading(true);
            await service.delete(id);
            await loadItems();
        } catch (error) {
            console.error('Erro ao deletar item:', error);
        } finally {
            setLoading(false);
        }
    };

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
    }

    useEffect(() => {
        loadItems();
    }, []);

    return (
        <DataTable<T>
            title={title}
            columns={columns}
            data={[
                ...(isAddingNew ? [{
                    id: 0,
                    ...newItem,
                    isNew: true
                }] : []),
                ...items.map(item => ({
                    ...item,
                    isEditing: item.id === editingId
                }))
            ]}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSave={isAddingNew ? handleSaveNew : handleSaveEdit}
            onFieldChange={isAddingNew ? handleNewItemChange : handleEditingChange}
            loading={loading}
            isAddingNew={isAddingNew}
            editingId={editingId}
        />
    );
}