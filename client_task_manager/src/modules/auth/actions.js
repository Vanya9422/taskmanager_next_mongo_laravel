// auth/actions.js
import {API} from "@~utils/axios"
import Cookies from 'js-cookie';
import {isLocalhost} from "@~utils/helpers";

// Типы действий для управления состоянием аутентификации
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const LOGOUT = 'LOGOUT';
export const SET_CSRF_TOKEN = 'SET_CSRF_TOKEN';

// Вспомогательная функция для создания объектов действий
const createAction = (type, payload = {}) => ({ type, ...payload });

export const setUser = (user) => dispatch => {
    dispatch(createAction(SET_USER_DETAILS, user));
};

export const clearUser = () => dispatch => {
    Cookies.remove('token');
    dispatch(createAction(LOGOUT));
};



// Асинхронный создатель действий для входа в систему
export const login = (credentials) => async dispatch => {
    dispatch(createAction(LOGIN_REQUEST));
    try {
        const { data: { data } } = await API.post('/auth/login', credentials);

        const { user, token } = data;

        // Определяем, работает ли приложение на локальном сервере
        const isLocal = isLocalhost();

        // Устанавливаем флаг secure в зависимости от того, работает ли приложение на локальном сервере
        const cookieOptions = {
            secure: !isLocal, // Устанавливаем secure: true на боевом сервере, secure: false на локальном
            // httpOnly: true,
        };

        // Сохраняем токен в куки с соответствующими параметрами
        Cookies.set('token', token, cookieOptions);

        dispatch(createAction(LOGIN_SUCCESS, { user }));
    } catch (error) {
        dispatch(createAction(LOGIN_FAILURE, { error: error.message }));

        throw error
    }
};

// Асинхронный создатель действий для выхода из системы
export const logout = () => async dispatch => {
    try {
        await API.post('/auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(() => Cookies.remove('token'));

        dispatch(createAction(LOGOUT));
    } catch (error) { throw error }
};

export const fetchUserData = (token) => async (dispatch) => {
    try {
        const response = await API.get('/user', {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setUser({user: response.data}));
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchCsrfToken = () => async (dispatch) => {
    try {
        const {data: {data}} = await API.get('/3d4bf18b866552d669a3c44c6e46e204');

        dispatch(createAction(SET_CSRF_TOKEN, {csrf_token: data}));
    } catch (error) {
        console.error('Ошибка при получении CSRF токена:', error);
    }
};
