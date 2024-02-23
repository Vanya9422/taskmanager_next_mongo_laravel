import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, fetchStatuses } from '@~modules/tasks/actions';
import TaskTable from "@~components/tasks/TaskTable";
import Pagination from "@~components/form/Pagination";
import TaskFilters from "@~components/tasks/TaskFilters";

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

    return (
        <div className="bg-white p-4 shadow rounded-lg">
            {error && <p className="text-center text-red-500">Ошибка: {error}</p>}
            {!error && (
                <>
                    <TaskFilters
                        statuses={statuses}
                        selectedStatus={selectedStatus}
                        onStatusChange={handleStatusChange}
                    />
                    <TaskTable tasks={tasks} loading={loading} onSortChange={handleSortChange}/>
                    <Pagination
                        currentPage={currentPage}
                        onPreviousClick={() => setCurrentPage(currentPage - 1)}
                        onNextClick={() => setCurrentPage(currentPage + 1)}
                        canGoBack={currentPage > 1}
                        canGoForward={tasks.length === 3}
                    />
                </>
            )}
        </div>
    );
};

export default TaskList;
