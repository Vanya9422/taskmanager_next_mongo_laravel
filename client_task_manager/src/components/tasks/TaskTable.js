// TaskTable.js
import TaskRow from "@~components/tasks/TaskRow";
import {selectIsAuthenticated} from "@~modules/auth/selectors";
import {useSelector} from "react-redux";
import React from "react";

const TaskTable = ({ tasks, loading, onSortChange }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    return (
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className="px-4 py-2 cursor-pointer underline accent-blue-400" onClick={() => onSortChange('username')}>Имя пользователя (↑↓)</th>
                    <th className="px-4 py-2 cursor-pointer underline" onClick={() => onSortChange('email')}>Email (↑↓)</th>
                    <th className="px-4 py-2 cursor-pointer underline" onClick={() => onSortChange('text')}>Текст задачи (↑↓)</th>
                    <th className="px-4 py-2 cursor-pointer underline" onClick={() => onSortChange('status')}>Статус (↑↓)</th>
                    <th className="px-4 py-2 cursor-pointer underline" onClick={() => onSortChange('edited_by_admin')}>Редактировано администратором (↑↓)</th>
                    <th className="px-4 py-2 cursor-pointer underline" onClick={() => onSortChange('created_at')}>Создано (↑↓)</th>
                    <th className="px-4 py-2 cursor-pointer underline" onClick={() => onSortChange('updated_at')}>Обновлено (↑↓)</th>
                    { isAuthenticated && (<th className="px-4 py-2">Действие</th>)}
                </tr>
            </thead>
            <tbody>
                {loading && (
                    <tr>
                        <td colSpan="100%" className="text-center py-4"> {/* Установите colSpan на максимальное количество колонок в таблице */}
                            <p className="text-blue-600 text-3xl">Загрузка...</p>
                        </td>
                    </tr>
                )}
                {!loading && (tasks.map(task => <TaskRow key={task.id} task={task} isAuthenticated={isAuthenticated} />))}
            </tbody>
        </table>
    )
};

export default TaskTable;
