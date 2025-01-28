import { DataTableContainer } from "../../components/DataTableContainer";
import { categoriesService } from "../../services/categoriesService";
import { Category } from "../../types/Category";
import { categorySchema } from "../../schemas/validations";
export function CategoryList() {
    const columns = [
        { field: 'ID', key: 'id', editable: false },
        { field: 'Título', key: 'title', editable: true },
        { field: 'Descrição', key: 'description', editable: true },
    ];

    return (
        <DataTableContainer<Category>
            title="Categorias"
            columns={columns}
            service={categoriesService}
            schema={categorySchema}
        />
    );
}