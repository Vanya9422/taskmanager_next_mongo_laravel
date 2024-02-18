// Файл useForm.js
import { useState } from 'react';

export const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(formData => ({ ...formData, [name]: value }));
    };

    const validateForm = () => {
        const validationErrors = {};
        // Валидация
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    return { formData, handleChange, errors, validateForm, setFormData, setErrors };
};
