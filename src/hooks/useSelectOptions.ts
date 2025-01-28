import { useState } from "react";


export function useSelectOptions(columns: any[]) {
    const [selectOptions, setSelectOptions] = useState<Record<string, any[]>>({});

    const loadSelectOptions = async () => {
        const columnsWithOptions = columns.filter(col => col.type === 'object' && col.options?.service);
        
        for (const column of columnsWithOptions) {
            try {
                const response = await column.options.service.getAll();
                setSelectOptions(prev => ({
                    ...prev,
                    [column.key]: response.data
                }));
            } catch (error) {
                console.error(`Erro ao carregar opções para ${column.key}:`, error);
            }
        }
    };

    return { selectOptions, loadSelectOptions };
} 