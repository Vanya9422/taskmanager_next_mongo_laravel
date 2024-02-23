import React from "react";
import SelectField from "@~components/form/SelectField";

const TaskFilters = ({ selectedStatus, onStatusChange, statuses }) => {
    return (
        <div className="mb-4">
            <SelectField
                label="Статус задачи"
                name="status"
                value={selectedStatus}
                onChange={onStatusChange}
                options={[{ value: '', label: 'Все статусы' }, ...statuses]}
            />
        </div>
    );
};

export default TaskFilters;
