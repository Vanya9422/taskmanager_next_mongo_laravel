import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, fetchStatuses } from '@~modules/tasks/actions';
import {
    selectTasks,
    selectStatuses,
    selectLoading,
    selectError
} from '@~modules/tasks/selectors';

const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectTasks);
    const statuses = useSelector(selectStatuses);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [sortField, setSortField] = useState(''); // Состояние для сортировки
    const [sortOrder, setSortOrder] = useState(''); // Порядок сортировки

    useEffect(() => {
        dispatch(fetchStatuses());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            fetchTasks({
                page: currentPage,
                status: selectedStatus,
                sort: sortField,
                order: sortOrder
            })
        )}, [dispatch, currentPage, selectedStatus, sortField, sortOrder]
    );

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (field) => {
        setSortField(field);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const renderStatusOptions = () => {
        return statuses.map((status) => (
            <option key={status.value} value={status.value}>
                {status.label}
            </option>
        ));
    };

    return (
        <div className="bg-white p-4 shadow rounded-lg">
            {loading && <p className="text-center text-gray-600">Загрузка...</p>}
            {error && <p className="text-center text-red-500">Ошибка: {error}</p>}
            {!loading && !error && (
                <>
                    <div className="mb-4">
                        <select
                            value={selectedStatus}
                            onChange={handleStatusChange}
                            className="mb-4 p-2 border rounded"
                        >
                            <option value="">Все статусы</option>
                            {renderStatusOptions()}
                        </select>
                        <button onClick={() => handleSortChange('username')} className="mx-2">
                            Сортировка по имени
                        </button>
                        <button onClick={() => handleSortChange('email')} className="mx-2">
                            Сортировка по email
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead>
                            <tr>
                                <th className="px-4 py-2">Имя пользователя</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Текст задачи</th>
                                <th className="px-4 py-2">Статус</th>
                                <th className="px-4 py-2">Редактировано администратором</th>
                                <th className="px-4 py-2">Создано</th>
                                <th className="px-4 py-2">Обновлено</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id}>
                                    <td className="border px-4 py-2">{task.username}</td>
                                    <td className="border px-4 py-2">{task.email}</td>
                                    <td className="border px-4 py-2">{task.text.length > 50 ? `${task.text.substring(0, 50)}...` : task.text}</td>
                                    <td className="border px-4 py-2">{task.status}</td>
                                    <td className="border px-4 py-2">{task.edited_by_admin ? 'Да' : 'Нет'}</td>
                                    <td className="border px-4 py-2">{task.created_at}</td>
                                    <td className="border px-4 py-2">{task.updated_at}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50">
                            Назад
                        </button>
                        <button onClick={() => setCurrentPage(currentPage + 1)}
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                            Вперёд
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskList;
