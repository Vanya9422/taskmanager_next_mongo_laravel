// pages/tasks/_id.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { selectTaskById } from '@~modules/tasks/selectors';
import { fetchTasks, updateTask } from '@~modules/tasks/actions';
import EditTaskForm from '@~components/tasks/EditTaskForm';
const EditTaskPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query; // ID задачи из URL
    const task = useSelector(state => selectTaskById(state, id));

    useEffect(() => {
        if (!task) {
            dispatch(fetchTasks()); // Загрузите все задачи, если они еще не загружены
        }
    }, [dispatch, id, task]);

    const handleSubmit = (updatedTaskData) => {
        dispatch(updateTask(id, updatedTaskData));
        router.push('/tasks/list');
    };

    if (!task) {
        return <p className="text-center text-blue-600 text-3xl">Задача Загружается...</p>;
    }

    return (
        <div>
            <EditTaskForm task={task} onSubmit={handleSubmit} />
        </div>
    );
};

export default EditTaskPage;
