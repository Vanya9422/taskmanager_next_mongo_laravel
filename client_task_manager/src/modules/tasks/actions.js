// tasks/actions.js
import {API, API_ADMIN} from "@~utils/axios"

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

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';


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
        const { data: { data } } = await API.get(`/tasks${queryString ? `?${queryString}` : ''}`);
        dispatch(createAction(FETCH_TASKS_SUCCESS, { payload: data }));
    } catch (error) {
        dispatch(createAction(FETCH_TASKS_FAILURE, { payload: error.message }));
    }
};

// Асинхронный создатель действий для получения статусов задач
export const fetchStatuses = () => async dispatch => {
    dispatch(createAction(FETCH_STATUSES_REQUEST));
    try {
        const { data: { data: { statuses } } } = await API.options('tasks', );
        dispatch(createAction(FETCH_STATUSES_SUCCESS, { payload: statuses }));
    } catch (error) {
        dispatch(createAction(FETCH_STATUSES_FAILURE, { payload: error.message }));
    }
};

// Асинхронный создатель действий для создания новой задачи
export const createTask = (taskData) => async (dispatch) => {
    dispatch(createAction(CREATE_TASK_REQUEST));

    return API.post('tasks', taskData)
        .then(({ data }) => {
            dispatch(createAction(CREATE_TASK_SUCCESS, { payload: data }));
            return data; // Разрешаем промис с данными для дальнейшего использования
        })
        .catch(error => {
            dispatch(createAction(CREATE_TASK_FAILURE, { payload: error.message }));
            throw error; // Передаём ошибку дальше по цепочке промисов
        });
};

// Создайте асинхронный action creator для обновления задачи
export const updateTask = (taskData) => async dispatch => {
    dispatch(createAction(UPDATE_TASK_REQUEST));
    return API_ADMIN.patch(`/tasks`, taskData) // Возвращает промис напрямую
        .then(({ data }) => {
            dispatch(createAction(UPDATE_TASK_SUCCESS, data));
            return data; // Разрешение промиса с данными
        })
        .catch(error => {
            dispatch(createAction(UPDATE_TASK_FAILURE, error.message));
            throw error; // Передача ошибки дальше в цепочку промиса
        });
};
