import { useState } from 'react';

export const useForm = (initialState, validateRules) => {
    const [formData, setFormDataInternal] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormDataInternal(formData => ({ ...formData, [name]: value }));
    };

    const validateForm = () => {
        const validationErrors = {};
        // Валидация с использованием переданных правил validateRules
        for (const field in validateRules) {
            const rules = validateRules[field];
            const value = formData[field];

            // Проверка на обязательность
            if (rules.required && !value) {
                validationErrors[field] = 'Это поле обязательно к заполнению.';
            }

            // Проверка на наличие цифр в имени
            if (rules.noDigits && value && /\d/.test(value)) {
                validationErrors[field] = 'Имя не должно содержать цифры.';
            }

            // Проверка на минимальную длину
            if (rules.minLength && value && value.length < rules.minLength) {
                validationErrors[field] = `Длина должна быть не менее ${rules.minLength} символов.`;
            }

            // Проверка на максимальную длину
            if (rules.maxLength && value && value.length > rules.maxLength) {
                validationErrors[field] = `Длина должна быть не более ${rules.maxLength} символов.`;
            }

            // Проверка на соответствие формату email
            if (rules.email && value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                validationErrors[field] = 'Введите корректный email адрес.';
            }

            // Проверка на integer для статуса
            if (rules.integer && value) {
                const numberValue = parseInt(value, 10);
                if (!Number.isInteger(numberValue)) {
                    validationErrors[field] = 'Значение должно быть целым числом.';
                }
            }
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    // Экспортируем setFormData для внешнего использования, чтобы обновлять всё состояние формы
    const setFormData = (newFormData) => {
        setFormDataInternal(newFormData);
    };

    return { formData, handleChange, errors, validateForm, setFormData, setErrors };
};
