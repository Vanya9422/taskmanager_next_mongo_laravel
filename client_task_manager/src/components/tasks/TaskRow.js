// TaskTableRow.js

import React from 'react';
import PropTypes from 'prop-types';

const TaskTableRow = ({ task }) => (
    <tr>
        <td className="border px-4 py-2">{task.username}</td>
        <td className="border px-4 py-2">{task.email}</td>
        <td className="border px-4 py-2">{task.text.length > 50 ? `${task.text.substring(0, 50)}...` : task.text}</td>
        <td className="border px-4 py-2">{task.status}</td>
        <td className="border px-4 py-2">{task.edited_by_admin ? 'Да' : 'Нет'}</td>
        <td className="border px-4 py-2">{task.created_at}</td>
        <td className="border px-4 py-2">{task.updated_at}</td>
    </tr>
);

TaskTableRow.propTypes = {
    task: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        edited_by_admin: PropTypes.bool,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired,
    }).isRequired,
};

export default TaskTableRow;
