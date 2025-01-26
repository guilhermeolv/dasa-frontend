import React from 'react'
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
}

interface DataTableProps<T> {
    title: string
    columns: Column[]
    data: T[]
    onAdd?: () => void
    onSave?: () => void
    onFieldChange?: (key: string, value: any) => void
    loading?: boolean
    isAddingNew?: boolean
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
}

export function DataTable<T extends { id: number }>({ 
    title, 
    columns, 
    data,
    onAdd,
    onSave,
    onFieldChange,
    loading,
    isAddingNew,
    onEdit,
    onDelete
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
                        {isAddingNew && (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={onSave}
                                sx={{ mr: 1 }}
                            >
                                Salvar
                            </Button>
                        )}
                        {onAdd && !isAddingNew && (
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
                                isAddingNew={isAddingNew}
                            />
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </MUIContainer>
    )
}