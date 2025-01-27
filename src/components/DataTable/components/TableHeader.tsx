import { 
    TableHead,
    TableRow,
    TableCell
} from '@mui/material'

interface Column {
    field: string
    key: string
}

interface TableHeaderProps {
    columns: Column[]
}

export function TableHeader({ columns }: TableHeaderProps) {
    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableCell key={column.key}>{column.field}</TableCell>
                ))}
                <TableCell align="center">Ações</TableCell>
            </TableRow>
        </TableHead>
    )
}