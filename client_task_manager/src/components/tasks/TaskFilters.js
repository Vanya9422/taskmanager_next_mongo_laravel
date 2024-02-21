const TaskFilters = ({ selectedStatus, onStatusChange, onSortChange, statuses }) => {
    return (
        <div className="mb-4">
            <select
                value={selectedStatus}
                onChange={onStatusChange}
                className="mb-4 p-2 border rounded"
            >
                <option value="">Все статусы</option>
                {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                        {status.label}
                    </option>
                ))}
            </select>
            <button onClick={() => onSortChange('username')} className="mx-2">
                Сортировка по имени
            </button>
            <button onClick={() => onSortChange('email')} className="mx-2">
                Сортировка по email
            </button>
        </div>
    );
};

export default TaskFilters;
