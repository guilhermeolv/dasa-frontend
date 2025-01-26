import React from 'react'
import { 
    TableBody as MUITableBody,
    TableRow,
    TableCell,
    IconButton,
    Tooltip
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Product } from '../../../types/Product'

interface Column {
    field: string
    key: string
}

interface TableBodyProps {
    data: Product[]
    columns: Column[]
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
}

export function TableBody({ data, columns, onEdit, onDelete }: TableBodyProps) {
    return (
        <MUITableBody>
            {data.map((item) => (
                <TableRow key={item.id}>
                    {columns.map((column) => (
                        <TableCell key={column.key}>
                            {item[column.key as keyof Product]}
                        </TableCell>
                    ))}
                    <TableCell>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {onEdit && (
                                <Tooltip title="Editar">
                                    <IconButton 
                                        onClick={() => onEdit(item.id)}
                                        color="primary"
                                        size="small"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                            
                            {onDelete && (
                                <Tooltip title="Excluir">
                                    <IconButton 
                                        onClick={() => onDelete(item.id)}
                                        color="error"
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </MUITableBody>
    )
}