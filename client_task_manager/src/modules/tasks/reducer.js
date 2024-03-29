// tasks/reducer.js
import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    FETCH_STATUSES_REQUEST,
    FETCH_STATUSES_SUCCESS,
    FETCH_STATUSES_FAILURE,
    CREATE_TASK_SUCCESS,
} from './actions';

const initialState = {
    tasks: [],
    statuses: [],
    loading: false,
    error: null,
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_REQUEST:
        case FETCH_STATUSES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
                loading: false,
            };
        case FETCH_STATUSES_SUCCESS:
            return {
                ...state,
                statuses: action.payload,
                loading: false,
            };
        case FETCH_TASKS_FAILURE:
        case FETCH_STATUSES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CREATE_TASK_SUCCESS:
        default:
            return state;
    }
};

export default tasksReducer;
