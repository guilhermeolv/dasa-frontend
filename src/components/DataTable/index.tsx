import { 
  Table, 
  TableContainer, 
  Paper, 
  Button,
  CircularProgress,
  Container as MUIContainer
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { TableHeader } from './components/TableHeader'
import { TableBody } from './components/TableBody'

interface Column {
    field: string
    key: string
    editable?: boolean
    type?: string
    options?: {
        service: any
        labelKey: string
        valueKey: string
    }
}

interface DataTableProps<T> {
    title: string
    columns: Column[]
    data: T[]
    onAdd?: () => void
    onSave?: () => void
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
    onCancel?: () => void
    onFieldChange?: (key: string, value: any) => void
    loading?: boolean
    isAddingNew?: boolean
    editingId?: number | null
    selectOptions?: Record<string, any[]>
    editingItem?: Partial<T>
    errors?: Record<string, string>
}

export function DataTable<T extends { id: number }>({ 
    title, 
    columns, 
    data,
    onAdd,
    onEdit,
    onSave,
    onDelete,
    onCancel,
    onFieldChange,
    loading,
    isAddingNew,
    editingId,
    selectOptions,
    editingItem,
    errors = {}
}: DataTableProps<T>) {
    return (
        <MUIContainer maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    <h2>{title}</h2>
                    <div>
                        {(isAddingNew || editingId) ? (
                            <>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={onSave}
                                    sx={{ mr: 1 }}
                                >
                                    Salvar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={onCancel}
                                >
                                    Cancelar
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={onAdd}
                            >
                                Adicionar
                            </Button>
                        )}
                    </div>
                </div>
                
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHeader columns={columns} />
                            <TableBody 
                                data={data}
                                columns={columns}
                                onFieldChange={onFieldChange}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                editingId={editingId}
                                editingItem={editingItem}
                                selectOptions={selectOptions}
                                errors={errors}
                            />
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </MUIContainer>
    )
}