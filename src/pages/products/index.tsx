import { DataTable } from "../../components/DataTable";

export function ProductList() {

    const mockProducts = [
        { id: 1, title: 'Produto 1', price: 100, description: 'Descrição do produto 1', category: 'Categoria 1' },
        { id: 2, title: 'Produto 2', price: 200, description: 'Descrição do produto 2', category: 'Categoria 2' },
    ]

    const columns = [
        { field: 'ID', key: 'id' },
        { field: 'Título', key: 'title' },
        { field: 'Descrição', key: 'description' },
        { field: 'Preço', key: 'price' },
        { field: 'Categoria', key: 'category' },
    ]

    const handleAdd = () => {
        console.log('Adicionar categoria');
    };

    const handleEdit = (id: number) => {
        console.log('Editar categoria', id);
    };

    const handleDelete = (id: number) => {
        console.log('Deletar categoria', id);
    };


    return (
        <DataTable<Product>
            title="Produtos"
            columns={columns}
            data={mockProducts}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    )
}