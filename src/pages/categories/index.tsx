import { DataTableContainer } from "../../components/DataTableContainer";
import { categoriesService } from "../../services/categoriesService";
import { Category } from "../../types/Category";

export function CategoryList() {
    const columns = [
        { field: 'ID', key: 'id' },
        { field: 'Título', key: 'title', editable: true },
        { field: 'Descrição', key: 'description', editable: true },
    ];

    return (
        <DataTableContainer<Category>
            title="Categorias"
            columns={columns}
            service={categoriesService}
        />
    );
}