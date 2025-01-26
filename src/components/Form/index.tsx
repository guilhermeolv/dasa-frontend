import { useState } from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    TextField,
    Grid
} from '@mui/material';

interface FormField {
    field: string;    // nome exibido
    key: string;      // chave do objeto
    type?: 'text' | 'number' | 'select' | 'date';  // tipo do campo
    required?: boolean;
}

interface FormProps {
    open: boolean;
    title: string;
    fields: FormField[];
    initialData?: any;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export function Form({ open, title, fields, initialData, onClose, onSubmit }: FormProps) {
    const [formData, setFormData] = useState(initialData || {});

    const handleChange = (key: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {fields.map((field) => (
                            <Grid item xs={12} key={field.key}>
                                <TextField
                                    label={field.field}
                                    name={field.key}
                                    value={formData[field.key] || ''}
                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                    required={field.required}
                                    type={field.type || 'text'}
                                    fullWidth
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
} 