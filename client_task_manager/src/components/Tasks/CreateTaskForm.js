import React from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '@~modules/tasks/actions';
import { InputField } from "@~components/Tasks/InputField";
import { useForm } from "@~components/Tasks/useForm";


const CreateTaskForm = () => {
    const dispatch = useDispatch();
    const {
        formData,
        handleChange,
        errors,
        validateForm,
        setFormData
    } = useForm({
        username: '',
        email: '',
        text: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        dispatch(createTask(formData));
        setFormData({ username: '', email: '', text: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <InputField label="Имя пользователя" type="text" name="username" value={formData.username} onChange={handleChange} error={errors.username} />
            <InputField label="Электронная почта" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <InputField label="Текст" as="textarea" name="text" value={formData.text} onChange={handleChange} error={errors.text} />
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Create Task
                </button>
            </div>
        </form>
    );
};

export default CreateTaskForm;
