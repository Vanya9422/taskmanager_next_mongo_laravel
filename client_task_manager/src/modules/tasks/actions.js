// tasks/actions.js
import API from "@~utils/axios"

export const FETCH_STATUSES_REQUEST = 'FETCH_STATUSES_REQUEST';
export const FETCH_STATUSES_SUCCESS = 'FETCH_STATUSES_SUCCESS';
export const FETCH_STATUSES_FAILURE = 'FETCH_STATUSES_FAILURE';

// Action types
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

// Actions for fetching statuses
export const fetchStatusesRequest = () => ({
    type: FETCH_STATUSES_REQUEST,
});

export const fetchStatusesSuccess = statuses => ({
    type: FETCH_STATUSES_SUCCESS,
    payload: statuses,
});

export const fetchStatusesFailure = error => ({
    type: FETCH_STATUSES_FAILURE,
    payload: error,
});

export const fetchStatuses = () => {
    return async dispatch => {
        dispatch(fetchStatusesRequest());
        try {
            const {
                data: {data: { statuses } }
            } = await API.options('tasks');

            dispatch(fetchStatusesSuccess(statuses));
        } catch (error) {
            dispatch(fetchStatusesFailure(error.message));
        }
    };
};


// Action creators
export const fetchTasksRequest = () => ({
    type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasks) => ({
    type: FETCH_TASKS_SUCCESS,
    payload: tasks,
});

export const fetchTasksFailure = (error) => ({
    type: FETCH_TASKS_FAILURE,
    payload: error,
});


    export const fetchTasks = (params = {}) => {
        return async dispatch => {
            dispatch(fetchTasksRequest());

            try {
                // Фильтрация параметров: отправляем только те, которые не пустые
                const effectiveParams = Object.entries(params).reduce((acc, [key, value]) => {
                    if (value) {
                        acc[key] = value;
                    }
                    return acc;
                }, {});

                // Добавляем параметры к запросу
                const queryString = new URLSearchParams(effectiveParams).toString();
                const {data: {data: data}} = await API.get(`tasks${queryString ? `?${queryString}` : ''}`);

                dispatch(fetchTasksSuccess(data));
            } catch (error) {
                dispatch(fetchTasksFailure(error.message));
            }
        };
    };
