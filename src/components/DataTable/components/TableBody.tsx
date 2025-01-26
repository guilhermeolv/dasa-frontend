import React from 'react'
import { 
    TableBody as MUITableBody,
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
    TextField
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { Product } from '../../../types/Product'

interface Column {
    field: string
    key: string
    editable?: boolean
    type?: string
}

interface TableBodyProps {
    data: Product[]
    columns: Column[]
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
    onFieldChange?: (key: string, value: any) => void
    isAddingNew?: boolean
    editingId?: number | null
}

export function TableBody({ 
    data, 
    columns, 
    onFieldChange,
    onEdit,
    onDelete,
    isAddingNew,
    editingId 
}: TableBodyProps) {
    const formatCellValue = (value: any, column: Column) => {
        if (value === null || value === undefined) {
            return '-';
        }

        if (typeof value === 'object') {
            if (value.title) return value.title;
            if (value.name) return value.name;
            return '-';
        }

        if (column.type === 'number') {
            return Number(value).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }

        return String(value);
    };

    const renderCell = (item: any, column: Column) => {
        if ((item.isNew || item.isEditing) && column.editable) {
            return (
                <TextField
                    size="small"
                    type={column.type || 'text'}
                    value={item[column.key] || ''}
                    onChange={(e) => onFieldChange?.(column.key, e.target.value)}
                    fullWidth
                />
            );
        }
        return formatCellValue(item[column.key], column);
    };

    return (
        <MUITableBody>
            {data.map((item) => (
                <TableRow key={item.id}>
                    {columns.map((column) => (
                        <TableCell key={column.key}>
                            {renderCell(item, column)}
                        </TableCell>
                    ))}
                    <TableCell>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {onEdit && !item.isNew && (
                                <Tooltip title={item.isEditing ? "Salvar" : "Editar"}>
                                    <IconButton 
                                        onClick={() => onEdit(item.id)}
                                        color={item.isEditing ? "success" : "primary"}
                                        size="small"
                                    >
                                        {item.isEditing ? <SaveIcon /> : <EditIcon />}
                                    </IconButton>
                                </Tooltip>
                            )}
                            
                            {onDelete && !item.isNew && !item.isEditing && (
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
    );
}