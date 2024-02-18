import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, fetchStatuses } from '@~modules/tasks/actions';
import TaskTable from "@~components/Tasks/TaskTable";
import Pagination from "@~components/Tasks/Pagination";
import TaskFilters from "@~components/Tasks/TaskFilters";

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
            {loading && <p className="text-center text-gray-600">Загрузка...</p>}
            {error && <p className="text-center text-red-500">Ошибка: {error}</p>}
            {!loading && !error && (
                <>
                    <TaskFilters
                        statuses={statuses}
                        selectedStatus={selectedStatus}
                        onStatusChange={handleStatusChange}
                        onSortChange={handleSortChange}
                    />
                    <TaskTable tasks={tasks} />
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
