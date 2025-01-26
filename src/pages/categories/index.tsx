import { DataTable } from "../../components/DataTable";
import { categoriesService } from "../../services/categoriesService";
import { Category } from "../../types/Category";

export function CategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const response = await categoriesService.getAll();
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

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