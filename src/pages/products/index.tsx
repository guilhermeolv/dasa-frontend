import { DataTableContainer } from "../../components/DataTableContainer";
import { categoriesService } from "../../services/categoriesService";
import { productsService } from "../../services/productsService";
import { Product } from "../../types/Product";

export function ProductList() {
    const columns = [
        { field: 'ID', key: 'id' },
        { field: 'Título', key: 'title', editable: true },
        { field: 'Descrição', key: 'description', editable: true },
        { field: 'Preço', key: 'price', editable: true, type: 'number' },
        { field: 'Categoria', key: 'category', editable: true, type: 'object', options: { service: categoriesService, labelKey: 'title', valueKey: 'id' } },
    ];

    return (
        <DataTableContainer<Product>
            title="Produtos"
            columns={columns}
            service={productsService}
        />
    );
}