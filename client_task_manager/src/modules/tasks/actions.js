// tasks/actions.js
import API from "@~utils/axios"

// Типы действий для управления состоянием запросов и данных задач
export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const FETCH_STATUSES_REQUEST = 'FETCH_STATUSES_REQUEST';
export const FETCH_STATUSES_SUCCESS = 'FETCH_STATUSES_SUCCESS';
export const FETCH_STATUSES_FAILURE = 'FETCH_STATUSES_FAILURE';

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

// Вспомогательная функция для создания объектов действий
const createAction = (type, payload = {}) => ({ type, ...payload });

// Функция для фильтрации параметров запроса и преобразования их в строку запроса
const filterParams = (params) => {
    const effectiveParams = Object.entries(params).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
    }, {});
    return new URLSearchParams(effectiveParams).toString();
};

// Асинхронный создатель действий для получения задач с возможностью фильтрации
export const fetchTasks = (params = {}) => async dispatch => {
    dispatch(createAction(FETCH_TASKS_REQUEST));
    try {
        const queryString = filterParams(params);
        const { data: { data } } = await API.get(`tasks${queryString ? `?${queryString}` : ''}`);
        dispatch(createAction(FETCH_TASKS_SUCCESS, { payload: data }));
    } catch (error) {
        dispatch(createAction(FETCH_TASKS_FAILURE, { payload: error.message }));
    }
};

// Асинхронный создатель действий для получения статусов задач
export const fetchStatuses = () => async dispatch => {
    dispatch(createAction(FETCH_STATUSES_REQUEST));
    try {
        const { data: { data: { statuses } } } = await API.options('tasks');
        dispatch(createAction(FETCH_STATUSES_SUCCESS, { payload: statuses }));
    } catch (error) {
        dispatch(createAction(FETCH_STATUSES_FAILURE, { payload: error.message }));
    }
};

// Асинхронный создатель действий для создания новой задачи
export const createTask = (taskData) => async dispatch => {
    dispatch(createAction(CREATE_TASK_REQUEST));
    try {
        const { data: { data } } = await API.post('tasks', taskData);
        dispatch(createAction(CREATE_TASK_SUCCESS, { payload: data }));
    } catch (error) {
        dispatch(createAction(CREATE_TASK_FAILURE, { payload: error.message }));
    }
};
