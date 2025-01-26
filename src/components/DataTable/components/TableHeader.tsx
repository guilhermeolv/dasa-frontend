import { 
    TableHead,
    TableRow,
    TableCell
} from '@mui/material'
import React from 'react'

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
                <TableCell>Ações</TableCell>
            </TableRow>
        </TableHead>
    )
}