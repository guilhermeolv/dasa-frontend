import { DataTable } from "../../components/DataTable";
import { Category } from "../../types/Category";

export function CategoryList() {
    const mockCategories: Category[] = [
        { id: 1, title: 'Categoria 1', description: 'Descrição da categoria 1' },
        { id: 2, title: 'Categoria 2', description: 'Descrição da categoria 2' },
    ];

    const columns = [
        { field: 'ID', key: 'id' },
        { field: 'Título', key: 'title' },
        { field: 'Descrição', key: 'description' },
    ];

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
        <DataTable<Category>
            title="Categorias"
            columns={columns}
            data={mockCategories}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    );
}