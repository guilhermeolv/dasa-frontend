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
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
    loading?: boolean
}

export function DataTable<T extends { id: number }>({ 
    title, 
    columns, 
    data, 
    onAdd, 
    onEdit, 
    onDelete, 
    loading 
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
                    {onAdd && (
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={onAdd}
                        >
                            Adicionar
                        </Button>
                    )}
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
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </MUIContainer>
    )
}