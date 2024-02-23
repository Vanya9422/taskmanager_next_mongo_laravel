// TaskTableRow.js

import React from 'react';
import PropTypes from 'prop-types';
import {useRouter} from "next/router";

const TaskTableRow = ({ task, isAuthenticated }) => {
    const router = useRouter();

    // Функция для перехода на страницу редактирования
    const handleEditClick = () => {
        router.push(`/tasks/${task.id}`);
    };


    return (
        task ? (
            <tr>
                <td className="border px-4 py-2">{task.username}</td>
                <td className="border px-4 py-2">{task.email}</td>
                <td className="border px-4 py-2">{task.text.length > 50 ? `${task.text.substring(0, 50)}...` : task.text}</td>
                <td className="border px-4 py-2">{task.status_display_text}</td>
                <td className="border px-4 py-2">{task.edited_by_admin ? 'Да' : 'Нет'}</td>
                <td className="border px-4 py-2">{task.created_at}</td>
                <td className="border px-4 py-2">{task.updated_at}</td>
                { isAuthenticated && (
                    <td className="border px-4 py-2">
                        <button
                            onClick={handleEditClick}
                            className="text-blue-500 hover:text-blue-700 underline"
                        >
                            Редактировать
                        </button>
                    </td>
                )}
            </tr>
        ) : null
    )
};

TaskTableRow.propTypes = {
    isAuthenticated: PropTypes.bool,
    task: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        status_display_text: PropTypes.string.isRequired,
        edited_by_admin: PropTypes.bool,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
    }).isRequired,
};

export default TaskTableRow;
