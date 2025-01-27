import { 
    TableBody as MUITableBody,
    TableRow,
    TableCell,
    IconButton,
    TextField,
    Select,
    MenuItem
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

interface Column {
    field: string
    key: string
    editable?: boolean
    type?: string
    options?: any
}

interface TableBodyProps<T> {
    data: T[]
    columns: Column[]
    onEdit?: (id: number) => void
    onDelete?: (id: number) => void
    onFieldChange?: (key: string, value: any) => void
    isAddingNew?: boolean
    editingId?: number | null
    selectOptions?: Record<string, any[]>
}

export function TableBody({ 
    data, 
    columns, 
    onFieldChange,
    onEdit,
    onDelete,
    selectOptions = {}
}: TableBodyProps<T>) {
    const renderCell = (item: any, column: Column) => {
        if (item.isEditing || (item.isNew && column.editable)) {
            if (column.type === 'object' && column.options) {
                console.log('selectOptions', selectOptions);
                return (
                    <Select
                        value={item[column.key]?.id || ''}
                        onChange={(e) => onFieldChange?.(column.key, {
                            id: e.target.value,
                            title: selectOptions[column.key]?.find(opt => opt.id === e.target.value)?.[column.options.labelKey]
                        })}
                        fullWidth
                        size="small"
                    >
                        {selectOptions[column.key]?.map(option => (
                            <MenuItem
                                key={option.id}
                                value={option.id}
                            >
                                {option[column.options.labelKey]}
                            </MenuItem>
                        ))}
                    </Select>
                );
            }

            if (column.type === 'number') {
                return (
                    <TextField
                        type="number"
                        value={item[column.key] || ''}
                        onChange={(e) => onFieldChange?.(column.key, e.target.value)}
                        fullWidth
                        size="small"
                    />
                );
            }

            return (
                <TextField
                    value={item[column.key] || ''}
                    onChange={(e) => onFieldChange?.(column.key, e.target.value)}
                    fullWidth
                    size="small"
                />
            );
        }

        if (column.type === 'object') {
            return item[column.key]?.[column.options?.labelKey] || '';
        }
        return item[column.key];
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
                    {(onEdit || onDelete) && (
                        <TableCell align="center">
                            {onEdit && !item.isNew && !item.isEditing && (
                                <IconButton onClick={() => onEdit(item.id)} size="small">
                                    <EditIcon />
                                </IconButton>
                            )}
                            {onDelete && !item.isNew && !item.isEditing && (
                                <IconButton onClick={() => onDelete(item.id)} size="small" color="error">
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </TableCell>
                    )}
                </TableRow>
            ))}
        </MUITableBody>
    );
}