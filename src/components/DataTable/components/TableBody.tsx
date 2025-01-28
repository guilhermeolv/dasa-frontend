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
import { NumericFormat } from 'react-number-format'

interface Column {
    field: string
    key: string
    editable?: boolean
    type?: 'text' | 'number' | 'object'
    options?: {
        labelKey: string
        valueKey: string
    }
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
    errors?: Record<string, string>
}

export function TableBody({ 
    data, 
    columns, 
    onFieldChange,
    onEdit,
    onDelete,
    selectOptions = {},
    errors = {}
}: TableBodyProps<T>) {
    const renderTextField = (item: any, column: Column) => {
        if (column.type === 'number' && column.key === 'price') {
            return (
                <NumericFormat
                    customInput={TextField}
                    value={item[column.key] ?? ''}
                    onValueChange={(values) => {
                        const { floatValue } = values;
                        onFieldChange?.(column.key, floatValue || null);
                    }}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale
                    fullWidth
                    size="small"
                    disabled={!column.editable}
                    error={!!errors[column.key]}
                    helperText={errors[column.key]}
                    inputProps={{
                        'aria-label': column.field,
                    }}
                />
            );
        }

        return (
            <TextField
                value={item[column.key] ?? ''}
                onChange={(e) => {
                    e.preventDefault();
                    const newValue = column.type === 'number' 
                        ? Number(e.target.value) || null
                        : e.target.value;
                    onFieldChange?.(column.key, newValue);
                }}
                type={column.type === 'number' ? 'number' : 'text'}
                fullWidth
                size="small"
                disabled={!column.editable}
                error={!!errors[column.key]}
                helperText={errors[column.key]}
                inputProps={{
                    'aria-label': column.field,
                }}
            />
        );
    };

    const renderSelect = (item: any, column: Column) => {
        const relatedObject = item[column.key];
        const currentValue = relatedObject ? relatedObject[column.options?.valueKey || 'id'] : '';
        const valueKey = column.options?.valueKey || 'id';
        const labelKey = column.options?.labelKey || '';
        
        return (
            <Select
                value={currentValue}
                displayEmpty
                onChange={(e) => {
                    e.preventDefault();
                    const selectedId = e.target.value;
                    const selectedObject = selectOptions[column.key]?.find(
                        option => option[valueKey] === selectedId
                    );
                    onFieldChange?.(column.key, selectedObject || null);
                }}
                fullWidth
                size="small"
                disabled={!column.editable}
            >
                <MenuItem value="">-</MenuItem>
                {selectOptions[column.key]?.map(option => (
                    <MenuItem 
                        key={option[valueKey]} 
                        value={option[valueKey]}
                    >
                        {option[labelKey]}
                    </MenuItem>
                ))}
            </Select>
        );
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const renderCell = (item: any, column: Column) => {
        if (item.isEditing || item.isNew) {
            if (column.type === 'object' && column.options) {
                return renderSelect(item, column);
            }
            return renderTextField(item, column);
        }
        if (column.type === 'object' && column.options) {
            const relatedObject = item[column.key];
            return relatedObject ? relatedObject[column.options.labelKey] : '-';
        }
        if (column.type === 'number' && column.key === 'price') {
            return formatCurrency(item[column.key]);
        }
        return item[column.key];
    };

    const renderActions = (item: any) => {
        if (!onEdit && !onDelete) return null;
        if (item.isNew || item.isEditing) return null;

        return (
            <TableCell align="center">
                {onEdit && (
                    <IconButton onClick={() => onEdit(item.id)} size="small">
                        <EditIcon />
                    </IconButton>
                )}
                {onDelete && (
                    <IconButton onClick={() => onDelete(item.id)} size="small" color="error">
                        <DeleteIcon />
                    </IconButton>
                )}
            </TableCell>
        );
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
                    {renderActions(item)}
                </TableRow>
            ))}
        </MUITableBody>
    );
}