import { useState } from "react";
import { z } from "zod";

export function useValidation<T>(schema?: z.ZodType<T>) {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = (key: string, value: any, validation?: z.ZodType<any>) => {
        if (!validation) return true;

        try {
            validation.parse(value);
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[key];
                return newErrors;
            });
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors(prev => ({
                    ...prev,
                    [key]: error.errors[0].message
                }));
            }
            return false;
        }
    };

    const validateItem = (item: Partial<T>) => {
        if (!schema) return true;

        try {
            schema.parse(item);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                error.errors.forEach(err => {
                    newErrors[err.path[0].toString()] = err.message;
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    return { errors, validateField, validateItem };
} 