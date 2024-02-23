import {useDispatch, useSelector} from 'react-redux';
import { updateTask } from '@~modules/tasks/actions';
import SelectField from "@~components/form/SelectField";
import { useForm } from "@~components/form/useForm";
import {selectStatuses} from "@~modules/tasks/selectors";
import InputField from "@~components/form/InputField";
import {useNotification} from "@~hooks/useNotification";

const EditTaskForm = ({ task }) => {
    const dispatch = useDispatch();
    const statuses = useSelector(selectStatuses); // Получаем статусы из состояния Redux
    const [showNotification, setShowNotification] = useNotification();

    // Правила валидации для формы редактирования задачи
    const validateRulesEdit = {
        text: { required: true, minLength: 10, maxLength: 1000 },
        status: { required: true, integer: true }
    };

    // Инициализация useForm с начальным состоянием задачи и правилами валидации
    const { formData, handleChange, errors, validateForm } = useForm({
        id: task.id,
        text: task.text,
        status: task.status
    }, validateRulesEdit);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(updateTask(formData))
                .then(() => {
                    setShowNotification(true);
                })
                .catch(error => {
                    alert(error);
                    setShowNotification(false);
                });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-lg font-semibold mb-4">Редактирование задачи</h2>
            {showNotification && <div className="text-green-600">Задача успешно обновлён!</div>}
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                <InputField
                    label="Текст задачи"
                    as="textarea"
                    type="text"
                    name="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.text}
                    onChange={handleChange}
                    error={errors.text}
                />
                <SelectField
                    label="Статус задачи"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    error={errors.status}
                    options={statuses}
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Сохранить изменения
                </button>
            </form>
        </div>
    );
};

export default EditTaskForm;
