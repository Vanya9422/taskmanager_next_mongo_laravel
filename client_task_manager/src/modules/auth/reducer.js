// src/modules/auth/reducer.js

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SET_USER_DETAILS, SET_CSRF_TOKEN } from './actions';

const initialState = {
    loading: false,
    isAuthenticated: false,
    error: null,
    user: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.user,
                error: null,
                isAuthenticated: true,
            };
        case SET_CSRF_TOKEN:
            return {
                ...state,
                csrf_token: action.csrf_token,
            };
        case SET_USER_DETAILS:
            return {
                ...state,
                user: action.user,
                isAuthenticated: true,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}
