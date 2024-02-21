// auth/actions.js
import API from "@~utils/axios"

// Типы действий для управления состоянием аутентификации
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';

export const LOGOUT = 'LOGOUT';

// Вспомогательная функция для создания объектов действий
const createAction = (type, payload = {}) => ({ type, ...payload });

// Асинхронный создатель действий для входа в систему
export const login = (credentials) => async dispatch => {
    dispatch(createAction(LOGIN_REQUEST));
    try {
        const { data: { data } } = await API.post('auth/login', credentials);

        const { user, token } = data;

        // Сохраните токен в localStorage или cookie
        localStorage.setItem('token', token);

        dispatch(createAction(LOGIN_SUCCESS, { user, token }));
    } catch (error) {
        dispatch(createAction(LOGIN_FAILURE, { error: error.message }));
    }
};

// Асинхронный создатель действий для выхода из системы
export const logout = () => async dispatch => {
    try {
        await API.post('auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        localStorage.removeItem('token');

        dispatch(createAction(LOGOUT));
    } catch (error) {
        console.error('Logout failed', error);
    }
};

export const setUser = (user) => dispatch => {
    dispatch(createAction(SET_USER_DETAILS, user));
};
