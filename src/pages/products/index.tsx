import { useState, useEffect } from "react";
import { DataTable } from "../../components/DataTable";
import { productsService } from "../../services/productsService";
import { Product } from "../../types/Product";

export function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newProduct, setNewProduct] = useState<Partial<Product>>({});
    const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});

    const columns = [
        { field: 'ID', key: 'id' },
        { field: 'Título', key: 'title', editable: true },
        { field: 'Descrição', key: 'description', editable: true },
        { field: 'Preço', key: 'price', editable: true, type: 'number' },
        { field: 'Categoria', key: 'category', editable: true },
    ];

    const handleAdd = () => {
        setIsAddingNew(true);
        setNewProduct({});
    };

    const handleEdit = (id: number) => {
        const product = products.find(p => p.id === id);
        if (product) {
            setEditingId(id);
            setEditingProduct({ ...product });
        }
    };

    const handleSaveEdit = async () => {
        if (!editingId) return;

        try {
            setLoading(true);
            await productsService.update(editingId, editingProduct as Product);
            await loadProducts();
            setEditingId(null);
            setEditingProduct({});
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditingChange = (key: string, value: any) => {
        setEditingProduct(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSaveNew = async () => {
        try {
            setLoading(true);
            await productsService.create(newProduct as Product);
            await loadProducts();
            setIsAddingNew(false);
            setNewProduct({});
        } catch (error) {
            console.error('Erro ao criar produto:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewProductChange = (key: string, value: any) => {
        setNewProduct(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleDelete = async (id: number) => {
        try {
            setLoading(true);
            await productsService.delete(id);
            await loadProducts();
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadProducts = async () => {
        try {
            setLoading(true);
            const response = await productsService.getAll();
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <DataTable<Product>
            title="Produtos"
            columns={columns}
            data={[
                ...(isAddingNew ? [{
                    id: 0,
                    ...newProduct,
                    isNew: true
                }] : []),
                ...products.map(product => ({
                    ...product,
                    isEditing: product.id === editingId
                }))
            ]}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSave={isAddingNew ? handleSaveNew : handleSaveEdit}
            onFieldChange={isAddingNew ? handleNewProductChange : handleEditingChange}
            loading={loading}
            isAddingNew={isAddingNew}
            editingId={editingId}
        />
    );
}