import { useDispatch } from 'react-redux';
import { createTask } from '@~modules/tasks/actions';
import { useForm } from "@~components/form/useForm";
import InputField from "@~components/form/InputField";
import {useNotification} from "@~hooks/useNotification";

const CreateTaskForm = () => {
    const dispatch = useDispatch();
    const [showNotification, setShowNotification] = useNotification();

    // Для формы создания задачи
    const initialStateCreate = {
        username: '',
        email: '',
        text: ''
    };

    // Правила валидации для формы создания задачи
    const validateRulesCreate = {
        username: { required: true, minLength: 3, maxLength: 30, noDigits: true},
        email: { required: true, email: true,  maxLength: 100 },
        text: { required: true, minLength: 10, maxLength: 1000 }
    };

    const {
        formData,
        handleChange,
        errors,
        validateForm,
        setFormData
    } = useForm(
        initialStateCreate,
        validateRulesCreate
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            // Отправка данных формы
            dispatch(createTask(formData))
                .then(() => {
                    setShowNotification(true); // Показать уведомление о создании задачи
                    setFormData(initialStateCreate); // Сбросить форму к начальному состоянию
                })
                .catch(error => alert(error));
        }
    };

    return (
        <>
            {showNotification && <div className="text-center my-4 text-green-600">Задача успешно создана!</div>}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <InputField
                    label="Имя пользователя"
                    type="text"
                    name="username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.username}
                    onChange={handleChange}
                    error={errors.username}
                />
                <InputField
                    label="Электронная почта"
                    type="email"
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <InputField
                    label="Текст"
                    name="text"
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.text}
                    onChange={handleChange}
                    error={errors.text}
                />
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Создать задачу
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateTaskForm;
